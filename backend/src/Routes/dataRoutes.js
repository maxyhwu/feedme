import { Router } from 'express';
import { insertCategory, insertIngredient, insertLabel, updataUserLike } from '../Controllers/dataController';
const router = Router();

router.post('/insert/Category', insertCategory);
router.post('/insert/Ingredient', insertIngredient);
router.post('/insert/Label', insertLabel);  // postman tested
router.post('/updateLike', updataUserLike)

export default router;
