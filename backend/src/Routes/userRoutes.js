import { Router } from 'express';
import { saveUser } from "../Middleware/userAuth"
import { login, signup, editFridge } from '../Controllers/userController';
import { generateToken, sendToken } from '../Middleware/setToken';

const router = Router();
router.get("/login", login, generateToken, sendToken)
router.post('/signup', saveUser, signup)
router.put('/edit-fridge', editFridge)

export default router