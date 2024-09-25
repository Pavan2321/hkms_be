const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask, getAvailableUsers } = require('../controllers/taskController');
const router = express.Router();
const { AuthUtil } = require('../utils/auth');

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/available-users', getAvailableUsers);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
