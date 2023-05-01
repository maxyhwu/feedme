import { Router } from 'express';
import { saveUser, emailValid, existEmail } from "../Middleware/userAuth"
import { login, signup, editFridge, sendEmail } from '../Controllers/userController';
import { generateToken, sendToken } from '../Middleware/setToken';
import { generateCode } from '../Middleware/verifyCode';

const router = Router();
router.get("/login", login, generateToken, sendToken)
router.post('/signup', emailValid, saveUser, signup)
router.post('/forgotpw', emailValid, existEmail, generateCode, sendEmail)
router.put('/edit-fridge', editFridge)

export default router