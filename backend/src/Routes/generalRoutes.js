import { Router } from 'express';
import { allIngredient, allCategory, allLabel } from '../Controllers/generalController';

const router = Router();

router.get('/ingredient', allIngredient);
router.get('/category', allCategory);
router.get('/label', allLabel);

export default router;
