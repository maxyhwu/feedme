import { Router } from "express";
import {
  qeuryByID,
  qeuryByName,
  queryByLabel,
  queryTopLikeCount,
  queryByIngredients,
  queryByUser,
  queryByFridge,
  queryTotalRecipeNumber,
  updateAddLikeCount,
  updateMinusLikeCount,
  updateRecipe,
  addComment,
  addRecipe,
  getCommentUserData,
  deleteByID,
  queryAll,
} from "../Controllers/recipeController";
import { checkToken } from "../Middleware/userAuth";
import { upload } from "../Config/multerConfig";

const router = Router();

router.get("/query/id", qeuryByID); //OK
router.get("/query/name", qeuryByName); //OK
router.get("/query/label", queryByLabel); //OK
router.get("/query/top", queryTopLikeCount); //OK
router.get("/query/ingredient", queryByIngredients); // OK
router.get("/query/user", checkToken, queryByUser); //
router.get("/query/all", queryAll); // for testing
router.get("/query/totalCount", queryTotalRecipeNumber) // OK
router.get("/query/fridge", checkToken, queryByFridge); // OK

router.delete("/delete/id", checkToken, deleteByID); // OK

router.put("/update/addlikeCount", checkToken, updateAddLikeCount); //OK
router.put("/update/minuslikeCount", checkToken, updateMinusLikeCount); //OK
router.put("/update/recipe", checkToken, updateRecipe); // OK

router.put("/add/new", checkToken, upload.single("image"), addRecipe); // OK
router.put("/add/comment", checkToken, addComment); // OK

router.get("/get/comment-data", getCommentUserData); // OK

export default router;
