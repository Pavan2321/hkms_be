const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();
const { AuthUtil } = require('../utils/auth');

router.post('/', createTask);
router.get('/', AuthUtil.authenticate, getTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
