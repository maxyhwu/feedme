import { Router } from "express";
import {
  qeuryByID,
  qeuryByName,
  queryByLabel,
  queryTopLikeCount,
  queryByIngredients,
  updateLikeCount,
  updateIngredients,
  updateInstructions,
  addComment,
  addRecipe,
} from "../Controllers/recipeController";

const router = Router();

router.get("/query/id", qeuryByID);
router.get("/query/name", qeuryByName);
router.get("/query/label", queryByLabel);
router.get("/query/top", queryTopLikeCount);
router.get("/query/ingredient", queryByIngredients);

router.get("/update/likeCount", updateLikeCount);
router.get("/update/recipe", updateRecipe);

router.get("/add/new", addRecipe);
router.get("/add/comment", addComment);

export default router;
