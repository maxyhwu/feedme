import dotenv from "dotenv-defaults";
import speakeasy from 'speakeasy';
import db from "../Model"
dotenv.config();

const User = db.users;

const createCode = () => {
  const secret = speakeasy.generateSecret({length: 6});
  const token = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    digits: 6,
    step: 300 // seconds
  });
  return [token, secret]
};

const verifyCode = (userToken, secretObj) => {
  const isValid = speakeasy.totp.verify({
    secret: secretObj.base32,
    encoding: 'base32',
    token: userToken, // the code entered by the user
    digits: 6,
    step: 300, // seconds
    window: 2 // allow codes that are 2 time steps (i.e. 10 minutes) old or new
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
    if ( user.secretKey === null) {
      cosnole.log("user secret key is null")
      return res.status(400).send({messege:"Invalid"})
    }
    let valid = verifyCode(token, user.secretKey);
    if ( !valid ) {
      console.log("Verification failed")
      return res.status(400).send({messege:"Invalid"})
    }
    const data = {
      secretKey: null
    }
    User.update( data, { where: { email: email}})
    next();
  } catch (err) {
    console.log('valid token failed')
    console.log(err)
  }
};

export {
  generateCode,
  verification
};