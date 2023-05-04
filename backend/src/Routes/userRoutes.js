import { Router } from 'express';
import { saveUser, emailValid, existEmail, checkToken } from "../Middleware/userAuth"
import { login, signup, editCurrentFridge, sendEmail, editProfile, getImage, keepRecipe, uploadToCloud, testUpload, deleteFromCloud} from '../Controllers/userController';
import { generateToken, sendToken } from '../Middleware/setToken';
import { generateCode } from '../Middleware/verifyCode';
import { upload } from '../Config/multerConfig'

const router = Router();
router.get("/login", login, generateToken, sendToken)
router.post('/signup', emailValid, saveUser, signup)
router.post('/forgotpw', emailValid, existEmail, generateCode, sendEmail)
router.put('/edit-profile', checkToken, editProfile)
router.post("/upload-image", upload.single('file'), uploadToCloud)// single 接收來自名為 fieldname 欄位的「單一」上傳檔案，並將檔案資訊存放在 req.file
router.post("/upload-test", upload.single('file'), testUpload)
router.get("/get-image", checkToken, getImage)
router.put('/edit-fridge', checkToken, editCurrentFridge)
router.put('/keep-recipes', checkToken, keepRecipe),
router.put('/update-image', checkToken, uploadToCloud)
router.post('/delete-image', checkToken, deleteFromCloud)

export default router