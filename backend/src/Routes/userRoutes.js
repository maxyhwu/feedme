const express = require('express')
const { logout, loginfail, loginsuccess } = require('../Controllers/userController')

const router = express.Router();
router.get("/login/success", loginsuccess)
router.get('/login/failed', loginfail)
router.get('/logout',logout )

module.exports = router