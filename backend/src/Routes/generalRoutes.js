import { Router } from 'express';
import { allIngredient, allCategory, allLabel } from '../Controllers/generalController';
import { pool } from '../Clients/pool'

const router = Router();

router.get('/ingredient', allIngredient);  // postman tested
router.get('/category', allCategory);  // postman tested
router.get('/label', allLabel);  // postman tested
// router.get('/testSocket', async (_, res) => {
//     const query = "NOTIFY comment_changes, 'This is the payload'";
//     const re = await pool.query(query);
//     // console.log(re);
//     res.send("success");
// })

export default router;
