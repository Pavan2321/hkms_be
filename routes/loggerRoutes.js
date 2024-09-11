const express = require('express');
const { logAction, logs } = require('../controllers/logController');
const router = express.Router();


router.post('/log-action', logAction);
router.get('/logs', logs);

module.exports = router;
