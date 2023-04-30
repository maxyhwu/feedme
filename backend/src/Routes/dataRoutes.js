import { Router } from 'express';
import { insertCategory, insertIngredient, insertLabel } from '../Controllers/dataController';

const router = Router();

router.get('/insert/Category', insertCategory);
router.get('/insert/Ingredient', insertIngredient);
router.get('/insert/Label', insertLabel);

export default router;
