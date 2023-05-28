import { Router } from 'express';
import { existUser, emailValid, existEmail, checkToken } from "../Middleware/userAuth"
import { login, signup, editCurrentFridge, sendEmail, editProfile, keepLikeRecipe, removeLikeRecipe, setPassword, getMyImage, updateCloud, getUserData, resetPassword } from '../Controllers/userController';
import { generateToken, sendToken } from '../Middleware/setToken';
import { generateCode, verification } from '../Middleware/verifyCode';
import { upload } from '../Config/multerConfig';

const router = Router();
router.post("/login", login, generateToken, sendToken)  // postman tested
router.post('/signup', emailValid, existUser, signup)  // postman tested
router.post('/forgotpw', emailValid, existEmail, generateCode, sendEmail)
router.post('/setPassword', verification, setPassword)
router.patch('/resetpassword',checkToken, resetPassword);
router.put('/edit-profile', checkToken, editProfile)

// router.post("/upload-image", checkToken, uploadToCloud)  // single 接收來自名為 file 欄位的「單一」上傳檔案，並將檔案資訊存放在 req.file
// router.post("/upload-test", upload.single('file'), testUpload)
router.put('/update-image', checkToken, upload.single('file'), updateCloud)

router.get("/get-myimage", checkToken, getMyImage)
router.put('/edit-fridge', checkToken, editCurrentFridge)  // postman tested
router.put('/keep-like-recipes', checkToken, keepLikeRecipe)
router.put('/remove-like-recipes', checkToken, removeLikeRecipe)
router.get('/get-userdata', checkToken, getUserData, generateToken, sendToken)


export default router