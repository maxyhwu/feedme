import dotenv from "dotenv-defaults";
import db from "../Model"
dotenv.config();
const User = db.users;
const Op = db.Sequelize.Op

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
                    iat: 1645869827, 
                    userEmail:user.email
                }
                // let token = jwt.sign({ id:user.id, iat: 1645869827, userEmail:user.email}, process.env.secretKey, {   //用jwt來為使用者生成token, secretKey是用來為jtw加密
                //     expiresIn: 1 *24 * 60 * 60 * 1000       //expiresIn 是設定有效期限
                //     })
                return next()
                // return res.status(201).send({success:true, token: token});
            } else {
                return res.status(201).send({success:false, message: 'Password incorrect'});
            }
        }else {
            console.log('Can not find')
            return res.status(201).send({success:false, message:'User name not found'});
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

const editFridge = async (req, _) => {
    const {logs} = req.query
    logs.forEach( async (log) => {
        console.log(log)
        const {op, data} = log;
        if (op === "add") {

        } else if (op === "remove") {

        } else if (op === "modify") {

        }
    });
}

export {
    login,
    signup,
    editFridge
}