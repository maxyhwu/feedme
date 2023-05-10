import dotenv from "dotenv-defaults";
dotenv.config();
import db from "../Model"
import bcrypt from "bcrypt";
import {sendForgetPWEmail} from "../services/userService"
import { uploads, destroys } from "../Config/cloudinary";
import fs from 'fs'
import { upload } from '../Config/multerConfig'
const User = db.users;
const Op = db.Sequelize.Op

const login = async (req, res, next) => {
    try {
        console.log(req.body)
        const {userData, password} = req.body;
        const user = await User.findOne({
            where: {
                // userName: userName
                [Op.or]: [{userName: userData}, {email: userData}]
            }});

        if (user !== null ) {
            const isSame = await bcrypt.compare(password, user.password);
            if (isSame) {
                req.auth = {
                    id:user.id, 
                    userEmail:user.email
                }
                req.user = user
                next()
            } else {
                return res.status(400).send({message: 'Password incorrect'});
            }
        }else {
            console.log('Can not find')
            return res.status(400).send({message:'User name not found'});
        }
    }catch (err) {
        console.log('login error');
        console.log(err);
    }
}

const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = {
            userName,
            email,
            password: hashedPassword,
        };
        console.log(data)
        const user = await User.create(data);
        if (user !== null) {
            return res.status(200).send({message:"Sign up successfully."});
        } else {
            return res.status(400).send({message:"Details are not correct"});
        }
    }catch (err) {
        console.log('signup error');
        console.log(err);
    }
}

const sendEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const token = req.token
        const secret = req.secret
        const data = {
            secretKey: secret
        }
        User.update( data, { where: { email: email}})
        const success = await sendForgetPWEmail(email, token)
        if ( success ){
            return res.status(200).send({message:"Email sent successfully."})
        } else{
            return res.status(400).send({message:"Send email error."})
        }
    } catch (err) {
        console.log('sendEmail error');
        console.log(err);
    }
}

const setPassword = async (req, res) => {
    try {
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = {
            password: hashedPassword,
        };
        await User.update( data, { where: { email: email}})
        res.status(200).send({message:"Set Password successfully."})
    } catch (err) {
        console.log('set password error');
        console.log(err);
    }
}

const editProfile = async (req, res) => {
    try{
        const user = req.user;
        const {userName, favorite, notiRec, notiIngre} = req.body
        User.update({
            userName,
            favorite,
            notiRec,
            notiIngre,
        },{ where: { id: user.id}})
        res.status(200).send({message:"Edit profile successfully."})
    } catch (err) {
        console.log('editProfile error');
        console.log(err);
    }
}

const getMyImage = async (req, res) => {
    try {
        const user = req.user;
        const image = await User.findOne({
            attributes: ['photo'],
            where: {
                id: user.id
            }});
        if (image) {
            return res.status(200).send({image: image});
        } else {
            return res.status(400).send({message: 'Error ID'});
        }
        
    }catch (err) {
        console.log('getImage error');
        console.log(err);
    }
}

const editCurrentFridge = async (req, res) => {
    try{
        const user = req.user;
        const {fridge} = req.body
        console.log(fridge)
        await User.update({
            fridge
        },{ where: { id: user.id}})
        return res.status(200).send({message:"Edit fridge successfully."})
    } catch (err) {
        console.log('editFridge error');
        console.log(err);
    }
}

const getUserData = async (req, res, next) => {
    try{
        const user = req.user
        req.auth = {
            id:user.id,
            userEmail:user.email
        }
        next()
    } catch (err) {
        console.log('editFridge error');
        console.log(err);
    }
}

const keepLikeRecipe = async (req, res) => {
    try{
        const articleID = req.body.id;
        const user = req.user;
        let {like} = await User.findOne({
            attributes: ['like'],
            where: { id: user.id }
        });
        console.log(like)
        like.push(articleID.toString());
        await User.update({
            like
        },{ where: { id: user.id}});
        return res.status(200).send({message:"keepLikeRecipe successfully."})
    } catch (err) {
        console.log('keepLikeRecipe error');
        console.log(err);
    }
}

const removeLikeRecipe = async (req, res) => {
    try{
        const articleID = req.body.id;
        const user = req.user;
        let {like} = await User.findOne({
            attributes: ['like'],
            where: { id: user.id }
        });
        // const removeIdx = like.indexOf(articleID.toString());
        // like.splice(removeIdx, 1);
        // ad-hoc solution (need to be solved in the future)
        like = like.filter(item => item !== articleID);
        await User.update({
            like
        },{ where: { id: user.id}});
        return res.status(200).send({message:"removeLikeRecipe successfully."})
    } catch (err) {
        console.log('removeLikeRecipe error');
        console.log(err);
    }
}

const destroyImage = async(id) => await destroys(id);
const uploaderImage = async(file) => await uploads(file, 'Avatars');

const updateCloud = async (req, res) => {
    try {
        const user = req.user;
        const {isDelete} = req.body;
        const image = await User.findOne({
            attributes: ['photoPID'],
            where: {
                id: user.id
        }});
        const noImage = !req.body.has('file')
        if (!noImage) { // 有 to 新, 沒有 to 新
            upload.single('file')
        }
        if ( image > 0 && noImage && isDelete ){  // 有 to 沒有
            destroyImage(image.photoPID)
            photoData = {
                photo: "",
                photoPID: -1
            }
            await User.update({
                photoData
            }, {where: { id: user.id}})
        }
        if ( !noImage ){  // 有 to 新, 沒有 to 有
            const url = ''
            const file = req.file
            const { path } = file;
            const newPath = await uploaderImage(path)
            url = newPath
            fs.unlinkSync(path)
            await User.update({
                photo: url.url,
                photoID: url.id
            },{ where: { id: user.id}})
        }
        return res.status(200).send({message:"Update successfully."})
    } catch (err) {
        console.log('delete cloud error');
        console.log(err)
    }
}

const testUpload = async (req, res) => {
    try{
        const uploader = async(file) => await uploads(file, 'Avatars');
        let url = ''
        const file = req.file
        const { path } = file
        const newPath = await uploader(path)
        url = newPath
        fs.unlinkSync(path)
        return res.status(200).send({url: url})
    } catch (err) {
        console.log('test error');
        console.log(err);
    }
}

export {
    login,
    signup,
    editCurrentFridge,
    sendEmail,
    editProfile,
    keepLikeRecipe,
    removeLikeRecipe,
    testUpload,
    updateCloud,
    setPassword,
    getMyImage,
    getUserData
}