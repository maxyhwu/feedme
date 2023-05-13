import { Router } from "express";
import {
  qeuryByID,
  qeuryByName,
  queryByLabel,
  queryTopLikeCount,
  queryByIngredients,
  // queryByFridge,
  updateAddLikeCount,
  updateMinusLikeCount,
  updateRecipe,
  addComment,
  addRecipe,
  getCommentUserData
} from "../Controllers/recipeController";
import { checkToken } from "../Middleware/userAuth";
import { upload } from "../Config/multerConfig";

const router = Router();

router.get("/query/id", qeuryByID);
router.get("/query/name", qeuryByName); //fix
router.get("/query/label", queryByLabel);
router.get("/query/top", queryTopLikeCount);
router.get("/query/ingredient", queryByIngredients); //tobecont

// router.get("/query/fridge", queryByFridge); //tobecont

router.put("/update/addlikeCount", checkToken, updateAddLikeCount);
router.put("/update/minuslikeCount", checkToken, updateMinusLikeCount);
router.put("/update/recipe", checkToken, updateRecipe);

router.put("/add/new", checkToken, upload.single('image'), addRecipe);
router.put("/add/comment", checkToken, addComment);

router.get("/get/comment-data", getCommentUserData);

export default router;
