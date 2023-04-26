import express from 'express';
import { getRecipeByName } from '../Controllers/recipeController';

const router = express.Router();
router.get("/getRecipeByName", getRecipeByName);


module.exports = router