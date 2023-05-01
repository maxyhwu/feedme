import { sign } from "jsonwebtoken";
import dotenv from "dotenv-defaults";
dotenv.config();
var createToken = function(auth) {
    return sign({
      id: auth.id,
      iat: auth.iat,
      email: auth.userEmail
    }, process.env.secretKey,
    {
      expiresIn: 1 *24 * 60 * 60 * 1000 
    });
  };
  
  var generateToken = function (req, res, next) {
    try {
      req.token = createToken(req.auth);
      return next();
    } catch (err) {
      console.log('Generate token failed')
    }
  };
  
  var sendToken = function (req, res) {
    try {
      res.setHeader('x-auth-token', req.token);
      console.log(req.token)
      return res.status(200).send({success: true, user:req.user});
    } catch (err) {
      console.log('Send token failed')
    }
  };

  export {
    generateToken,
    sendToken,
  };