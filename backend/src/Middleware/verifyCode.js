import { sign } from "jsonwebtoken";
import dotenv from "dotenv-defaults";
import speakeasy from 'speakeasy';
dotenv.config();
const secret = speakeasy.generateSecret({length: 20});
var createCode = function() {
    const token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
        digits: 6,
        time: 360,
      });
    return token
  };

var verifyCode = function() {
  const isValid = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: 'base32',
    token: userToken, // the code entered by the user
    digits: 6,
    window: 1
  });
  return isValid
};
  
  var generateCode = function (req, _, next) {
    try {
      req.token = createCode();
      return next();
    } catch (err) {
      console.log('Generate token failed')
    }
  };

  var verification = function (_, res, next) {
    try {
      let valid = verifyCode();
      if ( !valid ) {
        res.status(400).send({messege:"Invalid"})
      }
      return next();
    } catch (err) {
      console.log('valid token failed')
    }
  };

  export {
    generateCode,
    verification
  };