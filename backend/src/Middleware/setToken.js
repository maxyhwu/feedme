import { sign } from "jsonwebtoken";
import dotenv from "dotenv-defaults";
dotenv.config();

const createToken = (auth) => {
  return sign({
    id: auth.id,
    email: auth.userEmail
  }, process.env.secretKey,
  {
    expiresIn: "14d"
  });
};

const generateToken = (req, _, next) => {
  try {
    req.token = createToken(req.auth);
    next();
  } catch (err) {
    console.log('Generate token failed')
  }
};

const sendToken = (req, res) => {
  try {
    const user = req.user
    res.setHeader('x-auth-token', req.token);
    res.status(200).send({ userName:user.userName, email: user.email, fridge: user.fridge, favorite: user.favorite, like: user.like, notiRec: user.notiRec,  notiIngre:user.notiIngre, image: user.photo, provider: user.provider});
  } catch (err) {
    console.log('Send token failed')
    console.log(err)
  }
};

export {
  generateToken,
  sendToken,
};