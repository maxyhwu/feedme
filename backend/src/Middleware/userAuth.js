import db from "../Model";
import {isEmailValid} from '../services/userService'
import dotenv from "dotenv-defaults";
import jwt from "jsonwebtoken";
dotenv.config();

const User = db.users;

const existUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
                status: 'signed',
            },
        });
        // console.log('user',user)
        if (user !== null) {
            return res.status(400).send({message:"user already exists"});
        }else{
            console.log('create user')
            const unsigned_user = await User.findOne({
                where: {
                    email: req.body.email,
                    status: 'unsigned',
                },
            });
            if ( unsigned_user === null) {
                await User.create({email: req.body.email})
            }
            next();
        }
    } catch (error) {
        console.log('existUser error');
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
        if (user === null) {
            // console.log('hi')
            return res.status(400).send({message:"Email not exists."});
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
        const {deliverability, is_valid_format, is_mx_found, is_smtp_valid} = await isEmailValid(req.body.email)
        const isDeliverabel = deliverability === "DELIVERABLE"
        const valid = isDeliverabel && is_valid_format.value && is_mx_found.value && is_smtp_valid.value
        if ( valid ) {
            console.log('valid Email')
            next();
        }else{
            res.status(400).send({
                message: "Please provide a valid email address.",
            })
        }
    } catch (error) {
        console.log('email valid error');
        console.log(error);
    }
};

const checkToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log("token",token)
        const decoded = jwt.verify(token, process.env.secretKey)
        const user = await User.findOne({
            where:{
                id: decoded.id,
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
        res.status(400).send({ error: 'Please authenticate.' });
    }
};

export {
    existUser,
    existEmail,
    emailValid,
    checkToken
};