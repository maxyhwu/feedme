import { users } from "../Model";
require('dotenv').config()

const User = users;

const saveUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        console.log('user',user)
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

export {
    saveUser,
};