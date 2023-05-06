import { Router } from 'express';
import { existUser, emailValid, existEmail, checkToken } from "../Middleware/userAuth"
import { login, signup, editCurrentFridge, sendEmail, editProfile, keepRecipe, setPassword, getMyImage, updateCloud } from '../Controllers/userController';
import { generateToken, sendToken } from '../Middleware/setToken';
import { generateCode, verification } from '../Middleware/verifyCode';

const router = Router();
router.post("/login", login, generateToken, sendToken)  // postman tested
router.post('/signup', emailValid, existUser, signup)  // postman tested
router.post('/forgotpw', emailValid, existEmail, generateCode, sendEmail)
router.post('/setPassword', verification, setPassword)
router.put('/edit-profile', checkToken, editProfile)

// router.post("/upload-image", checkToken, uploadToCloud)  // single 接收來自名為 file 欄位的「單一」上傳檔案，並將檔案資訊存放在 req.file
// router.post("/upload-test", upload.single('file'), testUpload)
router.put('/update-image', checkToken, updateCloud)
// router.delete('/delete-image', checkToken, deleteFromCloud)

router.get("/get-myimage", checkToken, getMyImage)
router.put('/edit-fridge', checkToken, editCurrentFridge)  // postman tested
router.put('/keep-recipes', checkToken, keepRecipe)


export default router