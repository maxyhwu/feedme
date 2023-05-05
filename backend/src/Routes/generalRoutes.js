import { Router } from 'express';
import { allIngredient, allCategory, allLabel } from '../Controllers/generalController';

const router = Router();

router.get('/ingredient', allIngredient);  // postman tested
router.get('/category', allCategory);  // postman tested
router.get('/label', allLabel);  // postman tested

export default router;
