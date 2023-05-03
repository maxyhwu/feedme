import dotenv from "dotenv-defaults";
dotenv.config();
import db from "../Model"
import {sendForgetPWEmail} from "../Services/userService"
const User = db.users;
const Op = db.Sequelize

const login = async (req, res, next) => {
    try {
        const {userData, password} = req.body;
        const user = await User.findOne({
            where: {
                [Op.or]: [{userName: userData}, {email: userData}]
            }});

        if (user !== null ) {
            const isSame = await bcrypt.compare(password, user.password);
            if (isSame) {
                req.auth = {
                    id:user.id, 
                    iat: 10000, 
                    userEmail:user.email
                }
                // let token = jwt.sign({ id:user.id, iat: 1645869827, userEmail:user.email}, process.env.secretKey, {   //用jwt來為使用者生成token, secretKey是用來為jtw加密
                //     expiresIn: 1 *24 * 60 * 60 * 1000       //expiresIn 是設定有效期限
                //     })
                return next()
            } else {
                return res.status(201).send({success:false, message: 'Password incorrect'});
            }
        }else {
            console.log('Can not find')
            return res.status(200).send({success:false, message:'User name not found'});
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
            let userData = {userName: userName, email: email, password: hashedPassword, token:''}
            return res.send({success:true,userData});
        }else {
            return res.send({success:false,message:"Details are not correct"});
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

const editFridge = async (req, _) => {
    // const {logs} = req.query
    // logs.forEach( async (log) => {
    //     console.log(log)
    //     const {op, data} = log;
    //     if (op === "add") {

    //     } else if (op === "remove") {

    //     } else if (op === "modify") {

    //     }
    // });
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

const keepRecipe = async (req, _) => {
    try{
        const articleID = req.body.id;
        const user = req.user;
        const label = User.findOne({
            attributes: ['label'],
            where: { id: user.id}
        })
        label.push(articleID.toString())
        User.update({
            label
        },{ where: { id: user.id}})
        res.status(200).send({success: true})
    } catch (err) {
        console.log('keepRecipe error');
        console.log(err);
    }
}

export {
    login,
    signup,
    editFridge,
    sendEmail,
    editProfile,
    uploadImage,
    getImage,
    keepRecipe
}