const express = require('express')
const { insertCategory, insertIngredient } = require('../Controllers/dataController').default;

const router = express.Router();

router.get('/insert/Category', insertCategory);
router.get('/insert/Ingredient', insertIngredient);
module.exports = router
