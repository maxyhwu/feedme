import { Router } from 'express';
import { logout, loginfail, loginsuccess, signup, editFridge } from '../Controllers/userController';

const router = Router();
router.get("/login/success", loginsuccess)
router.get('/login/failed', loginfail)
router.get('/logout', logout)
router.post('/signup', signup)
router.put('/edit-fridge', editFridge)

export default router