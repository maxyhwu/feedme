const express = require('express')
const { twitterVerified, authenticate, login, reverse, redirect } = require('../Controllers/twitterController');
const {generateToken, sendToken} = require('../Middleware/setToken');

const router = express.Router();

router.post('/auth/twitter/login', twitterVerified, authenticate, login, generateToken, sendToken);
router.post('/auth/twitter/reverse', reverse)
module.exports = router