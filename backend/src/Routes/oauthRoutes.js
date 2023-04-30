import { Router } from 'express';
import { twitterVerified, authenticate, login, reverse, redirect } from '../Controllers/twitterController';
import { googleOauthHandler, googleOauthSignupHandler } from '../Controllers/googleAuthController';
import { generateToken, sendToken } from '../Middleware/setToken';

const router = Router();

router.post('/auth/twitter/login', twitterVerified, authenticate, login, generateToken, sendToken);
router.post('/auth/twitter/reverse', reverse)
router.get('/google/login', googleOauthHandler);
router.get('/google/signup', googleOauthSignupHandler);

export default router