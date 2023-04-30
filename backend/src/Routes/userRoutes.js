import { Router } from 'express';
import { logout, loginfail, loginsuccess } from '../Controllers/userController';

const router = Router();
router.get("/login/success", loginsuccess)
router.get('/login/failed', loginfail)
router.get('/logout', logout)

export default router