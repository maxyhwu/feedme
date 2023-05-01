import { Router } from 'express';
import { login, signup, editFridge } from '../Controllers/userController';

const router = Router();
router.get("/login", login)
router.post('/signup', signup)
router.put('/edit-fridge', editFridge)

export default router