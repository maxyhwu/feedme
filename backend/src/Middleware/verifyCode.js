import dotenv from "dotenv-defaults";
import speakeasy from 'speakeasy';
import db from "../Model"
dotenv.config();

const User = db.users;

const createCode = () => {
  const secret = speakeasy.generateSecret({length: 20});
  const token = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
      digits: 6,
      time: 360,
    });
  return [token, secret]
};

const verifyCode = (userToken, secret) => {
  const isValid = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: 'base32',
    token: userToken, // the code entered by the user
    digits: 6,
    window: 1
  });
  return isValid
};

const generateCode = (req, _, next) => {
  try {
    const [token, secret]= createCode();
    req.token = token
    req.secret = secret
    next();
  } catch (err) {
    console.log('Generate token failed')
  }
};

const verification = async (req, res, next) => {
  try {
    const { email, token } = req.body
    const user = await User.findOne({
      where: {
          email: email
      }});
    if ( secretKey == null) {
      res.status(400).send({messege:"Invalid"})
    }
    let valid = verifyCode(token, user.secretKey);
    if ( !valid ) {
      res.status(400).send({messege:"Invalid"})
    }
    const data = {
      secretKey: null
    }
    User.update( data, { where: { email: email}})
    next();
  } catch (err) {
    console.log('valid token failed')
  }
};

export {
  generateCode,
  verification
};