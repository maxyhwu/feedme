import { Router } from 'express';
import { insertCategory, insertIngredient } from '../Controllers/dataController';

const router = Router();

router.get('/insert/Category', insertCategory);
router.get('/insert/Ingredient', insertIngredient);

export default router;
