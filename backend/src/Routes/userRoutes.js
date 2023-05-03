import { Router } from 'express';
import { saveUser, emailValid, existEmail, checkToken } from "../Middleware/userAuth"
import { login, signup, editFridge, sendEmail, editProfile, uploadImage, getImage } from '../Controllers/userController';
import { generateToken, sendToken } from '../Middleware/setToken';
import { generateCode } from '../Middleware/verifyCode';
const upload = require('../Config/multerConfig')

const router = Router();
router.get("/login", login, generateToken, sendToken)
router.post('/signup', emailValid, saveUser, signup)
router.post('/forgotpw', emailValid, existEmail, generateCode, sendEmail)
router.put('/edit-profile', checkToken, editProfile)
router.post("/upload-image", upload.single('file'), uploadImage )// single 接收來自名為 fieldname 欄位的「單一」上傳檔案，並將檔案資訊存放在 req.file
router.get("/get-image", getImage)
router.put('/edit-fridge', checkToken, editFridge)

export default router