const express = require('express');
const { register, login, reset_password, forget_password } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', reset_password);
router.post('/forget-password', forget_password);

module.exports = router;