import { Router } from 'express';
import { qeuryByID, qeuryByName, queryByLabel } from '../Controllers/recipeController';

const router = Router();

router.get('/query/id', qeuryByID);
router.get('/query/name', qeuryByName);
router.get('/query/label', queryByLabel);

export default router;
