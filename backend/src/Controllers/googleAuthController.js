import { getGoogleOauthToken, getGoogleUser } from '../Services/service.js';
import dotenv from "dotenv-defaults";
dotenv.config();
import db from "../Model";
import jwt from "jsonwebtoken";

const Op = db.Sequelize.Op

const User = db.users;
import AppError from '../utils/appError';

const googleOauthHandler = async (req,res,next) => {
    try {
      // Get the code from the query
    const code = req.query.code;
    const pathUrl = (req.query.state) || '/';

    if (!code) {
    return next(new Error('Authorization code not provided!'));//401
    }

    const redirect_uri = process.env.GOOGLE_OAUTH_REDIRECT_URL

    // Use the code to get the id and access tokens
    const { id_token, access_token } = await getGoogleOauthToken({ code,redirect_uri });


    // Use the token to get the User
    const { name, verified_email, email, photo } = await getGoogleUser({
        id_token,
        access_token,
    });
    // Check if user is verified
    if (!verified_email) {
        return next(new AppError('Google account not verified', 403)); //403
    }
    const userEmail = await User.findOne({
        where: {
            email: email,
        },
    });
    if (!userEmail) {
        return next(new AppError("This email haven't sign up", 401));
    }

    const data = {
        googleName: name,
        provider: 'Google',
        photo: photo,
    };

    User.update(data, {where: {email: email}});

    const user = await User.findOne({
        where: {
            email: email,
        },
    });
    if (!user) {
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error`);
    }
      let token = jwt.sign({ id:user.id, iat: 1645869827, userEmail:user.email}, process.env.secretKey, {   //用jwt來為使用者生成token, secretKey是用來為jtw加密
        expiresIn: 1 *24 * 60 * 60 * 1000       //expiresIn 是設定有效期限
    })
    res.cookie('token', token);
    res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}${pathUrl}`);
    } catch (err) {
        console.log('Failed to authorize Google User', err);
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error`);
    }
};

const googleOauthSignupHandler = async (req,res,next) => {
    try {
    // Get the code from the query
    const code = req.query.code;
    const pathUrl = (req.query.state) || '/';

    if (!code) {
        return next(new AppError('Authorization code not provided!', 401));
    }

    const redirect_uri = process.env.GOOGLE_OAUTH_REDIRECT_URL_SIGNUP
    // Use the code to get the id and access tokens
    const { id_token, access_token } = await getGoogleOauthToken({ code, redirect_uri });


    // Use the token to get the User
    const { name, verified_email, email, photo } = await getGoogleUser({
        id_token,
        access_token,
    });
    // Check if user is verified
    if (!verified_email) {
        return next(new AppError('Google account not verified', 403));
    }

    const userName = await User.findOne({
        where: {
            email: email,
            verified: 'true'
        },
    });
    if (userName) {
        return next(new AppError('This email is already registered', 409));
    }

    const data = {
        userName: name,
        email: email,
        password: '',
        provider: 'Google',
        photo: photo,
    };

    const sameNameUser = await User.findOne({
        where: {
            // [Op.or]: [{userName: name}, {authorName: name}]
            userName: name,
            email: email
        }});
    if ( sameNameUser !== null){
        console.log('sameuser')
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error`);
    }else{
        const userExist = await User.findOne({
            where: {
                email: email,
                provider: "local"
            },
        });
        if (userExist !== null) {
            await User.update(data, {where:{email: email}})
        } else {
            const emailExist = await User.findOne({
                where: {
                    email: email,
                },
            });
            if (emailExist == null) {
                await User.create(data);
            } else {
                return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error`);
            }
        }
        res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}${pathUrl}`);
    }

    } catch (err) {
        console.log('Failed to authorize Google User', err);
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error`);
    }
};

export {
    googleOauthHandler,
    googleOauthSignupHandler
};
