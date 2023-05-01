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

export {
    saveUser,
    existEmail,
    emailValid
};