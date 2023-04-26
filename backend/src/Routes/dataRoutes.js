const express = require('express')
const { insertCategory, insertIngredient } = require('../Controllers/dataController');

const router = express.Router();

router.get('/insert/Category', insertCategory);
router.get('/insert/Ingredient', insertIngredient);
module.exports = router