import { getGoogleOauthToken, getGoogleUser } from '../services/service';
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
    const { name, verified_email, email } = await getGoogleUser({
        id_token,
        access_token,
    });
    // Check if user is verified
    if (!verified_email) {
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error/no-verified`);
    }
    const user = await User.findOne({
        where: {
            email: email,
            provider: "Google"
        },
    });
    console.log(user)
    if (!user) {
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error/no-signup`);
    }
    let token = jwt.sign({ id:user.id, email:user.email}, process.env.secretKey, {   //用jwt來為使用者生成token, secretKey是用來為jtw加密
        expiresIn: '14d'      //expiresIn 是設定有效期限
    })
    res.cookie('user', {userName: user.userName, email: user.email, token: token, fridge: user.fridge, like: user.like, favorite: user.favorite, notiRec: user.notiRec, notiIngre: user.notiIngre, image: user.image});
    res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}${pathUrl}`);
    } catch (err) {
        console.log('Failed to authorize Google User', err);
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error/something-wrong`);
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
    const { name, verified_email, email } = await getGoogleUser({
        id_token,
        access_token,
    });
    // Check if user is verified
    if (!verified_email) {
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error/no-verified`);
    }

    const userName = await User.findOne({
        where: {
            email: email,
        },
    });
    if (userName) {
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error/has-registed`);
    }

    const data = {
        userName: name,
        email: email,
        password: '',
        provider: 'Google',
    };

    const sameEmailUser = await User.findOne({
        where: {
            // [Op.or]: [{userName: name}, {authorName: name}]
            email: email
        }});
    if ( sameEmailUser !== null){
        console.log('same email')
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error/same-email`);
    }else{
        await User.create(data)
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}${pathUrl}`);
    }

    } catch (err) {
        console.log('Failed to authorize Google User', err);
        return res.redirect(`${process.env.CLIENT_HOME_PAGE_URL}/oauth/error/something-wrong`);
    }
};

export {
    googleOauthHandler,
    googleOauthSignupHandler
};
