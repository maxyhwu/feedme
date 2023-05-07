import { Router } from 'express';
import { twitterVerified, authenticateLogin, authenticateSignup, login, signup, reverse } from '../Controllers/twitterController';
import { googleOauthHandler, googleOauthSignupHandler } from '../Controllers/googleAuthController';
import { generateToken, sendToken } from '../Middleware/setToken';

const router = Router();

router.post('/auth/twitter/signup', twitterVerified, authenticateSignup, signup);
router.post('/auth/twitter/login', twitterVerified, authenticateLogin, login, generateToken, sendToken);
router.post('/auth/twitter/reverse', reverse)
router.get('/google/login', googleOauthHandler);
router.get('/google/signup', googleOauthSignupHandler);

export default router