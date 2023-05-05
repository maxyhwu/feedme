import dotenv from "dotenv-defaults";
dotenv.config();
import db from "../Model"
import bcrypt from "bcrypt";
import {sendForgetPWEmail} from "../Services/userService"
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
                res.status(400).send({message: 'Password incorrect'});
            }
        }else {
            console.log('Can not find')
            res.status(400).send({message:'User name not found'});
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
            res.status(200);
        } else {
            res.status(400).send({message:"Details are not correct"});
        }
    }catch (err) {
        console.log('signup error');
        console.log(err);
    }
}

const sendEmail = async (req, res) => {
    try {
        console.log(req.body)
        const { email } = req.body;
        const token = req.token
        let success = await sendForgetPWEmail(email, token)
        if ( success )
            res.status(200)
        else
            res.status(400)
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
            email,
            password: hashedPassword,
        };
        User.update( data, { where: { email: email}})
        res.status(200)
    } catch (err) {
        console.log('send password error');
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
        res.status(200)
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
            res.status(200).send({image: image});
        } else {
            res.status(400).send({message: 'Error ID'});
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
        res.status(200)
    } catch (err) {
        console.log('editFridge error');
        console.log(err);
    }
}

const keepRecipe = async (req, res) => {
    try{
        const articleID = req.body.id;
        const user = req.user;
        let like = User.findOne({
            attributes: ['like'],
            where: { id: user.id }
        })
        like.push(articleID.toString())
        User.update({
            like
        },{ where: { id: user.id}})
        res.status(200)
    } catch (err) {
        console.log('keepRecipe error');
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
            User.update({
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
            User.update({
                photo: url.url,
                photoID: url.id
            },{ where: { id: user.id}})
        }
        res.status(200)
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
        res.status(200).send({url: url})
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
    keepRecipe,
    testUpload,
    updateCloud,
    setPassword,
    getMyImage,
}