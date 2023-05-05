import dotenv from "dotenv-defaults";
dotenv.config();
import db from "../Model"
import bcrypt from "bcrypt";
import {sendForgetPWEmail} from "../Services/userService"
import { uploads, destroys } from "../Config/cloudinary";
import fs from 'fs'
const User = db.users;
const Op = db.Sequelize.Op

const login = async (req, res, next) => {
    try {
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
                return next()
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
            return res.status(200);
        }else {
            return res.status(400).send({message:"Details are not correct"});
        }
    }catch (err) {
        console.log('signup error');
        console.log(err);
    }
}

const sendEmail = async (req, res) => {
    try{
        console.log(req.body)
        const { email } = req.body;
        const token = req.token
        let success = await sendForgetPWEmail(email, token)
        res.status(200).send({success: success})
    } catch (err) {
        console.log('sendEmail error');
        console.log(err);
    }
}

const editProfile = async (req, res) => {
    try{
        const user = req.user;
        const {favorite, notiRec, notiIngre} = req.body
        User.update({
            favorite,
            notiRec,
            notiIngre,
        },{ where: { id: user.id}})
        res.status(200).send({success: true})
    } catch (err) {
        console.log('editProfile error');
        console.log(err);
    }
}

const uploadImage = async (req, res) => {
    try{
        const user = req.user;
        const file = req.file;
        User.update({
            photo: file.buffer
        },{ where: { id: user.id}})
        res.status(200).send({success: true})
    } catch (err) {
        console.log('uploadImage error');
        console.log(err);
    }
}

const getImage = async (req, res) => {
    try {
        const user = req.user;
        const image = await User.findOne({
            attributes: ['photo'],
            where: {
                id: user.id
            }});
        if (image) {
            return res.status(201).send({success:true,image: image});
        } else {
            return res.status(201).send({success:false, message: 'Error ID'});
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
        User.update({
            fridge
        },{ where: { id: user.id}})
        res.status(200).send({success: true})
    } catch (err) {
        console.log('editFridge error');
        console.log(err);
    }
}

const keepRecipe = async (req, res) => {
    try{
        const articleID = req.body.id;
        const user = req.user;
        const like = User.findOne({
            attributes: ['like'],
            where: { id: user.id}
        })
        like.push(articleID.toString())
        User.update({
            label
        },{ where: { id: user.id}})
        res.status(200).send({success: true})
    } catch (err) {
        console.log('keepRecipe error');
        console.log(err);
    }
}

const uploadToCloud = async (req, res) => {
    try{
        const user = req.user
        const uploader = async(path) => await uploads(path, 'Avatars');
        const url = ''
        const file = req.file
        const {path} = file;
        const newPath = await uploader(path)
        url = newPath
        fs.unlinkSync(path)
        User.update({
            photo: url.url,
            photoID: url.id
        },{ where: { id: user.id}})
        res.status(200).send({success: true})
    } catch (err) {
        console.log('upload cloud error');
        console.log(err);
    }
}

const deleteFromCloud = async (req, res) => {
    try{
        const uploader = async(id) => await destroys(id);
        const user = req.user
        const image = await User.findOne({
            attributes: ['photoPID'],
        where: {
            id: user.id
        }});
        if(image < 0) {
            res.status(404);
            throw new Error("Photo not found");
        }
        uploader(image.photoPID)
        photoData = {
            photo: "",
            photoPID: -1
        }
        User.update({
            photoData
        }, {where: { id: user.id}})
    } catch (err) {
        console.log('delete cloud error');
        console.log(err)
    }
}

const updateCloud= async (req, res) => {
    try{
        const destroy = async(id) => await destroys(id);
        const uploader = async(file) => await uploads(file, 'Avatars');
        const user = req.user
        const image = await User.findOne({
            attributes: ['photoPID'],
        where: {
            id: user.id
        }});
        if ( image < 0){
            destroy(image.photoPID)
        }
        const url = ''
        const file = req.file
        const {path} = file;
        const newPath = await uploader(path)
        url = newPath
        fs.unlinkSync(path)
        User.update({
            photo: url.url,
            photoID: url.id
        },{ where: { id: user.id}})
        res.status(200).send({success: true})
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
        res.status(200).send({success: true, url: url})
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
    uploadImage,
    getImage,
    keepRecipe,
    uploadToCloud,
    testUpload,
    deleteFromCloud,
    updateCloud
}