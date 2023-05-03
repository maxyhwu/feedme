import { users } from "../Model";
import {isEmailValid} from '../Services/userService'
import dotenv from "dotenv-defaults";
dotenv.config();

const User = users;

const saveUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        // console.log('user',user)
        if (user !== null) {
            return res.send({success:false,message:"user already exists"});
        }else{
            next();
        }
    } catch (error) {
        console.log('saveUser error');
        console.log(error);
    }
};

const existEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        // console.log('user',user)
        req.user = user
        if (user == null) {
            return res.send({success:false,message:"email not exists"});
        }else{
            next();
        }
    } catch (error) {
        console.log('exist Email error');
        console.log(error);
    }
};

const emailValid = async (req, res, next) => {
    try {
        const {valid, reason, validators} = await isEmailValid(req.body.email)
        if ( valid ) {
            next();
        }else{
            res.status(400).send({
                message: "Please provide a valid email address.",
                reason: validators[reason].reason
            })
        }
    } catch (error) {
        console.log('saveUser error');
        console.log(error);
    }
};

const checkToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log('token=',token)
        const decoded = jwt.verify(token, process.env.secretKey)
        console.log('decoded id =',decoded.id)
        console.log('decoded user =', decoded.userEmail)
        const user = await User.findOne({
            where:{
                id: decoded.id,
                email: decoded.userEmail,
            }
        });
        if (user!== null) { console.log('find')}
        else { throw new Error() }
        req.token = token
        req.user = user

        next();
    } catch (error) {
        console.log('checkUser error');
        console.log(error);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

export {
    saveUser,
    existEmail,
    emailValid,
    checkToken
};