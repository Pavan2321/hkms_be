const express = require('express');
const { createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getAvailableUsers,
    getSubTask,
    createSubTask,
    getSubTaskById,
    getSubTaskByTaskId,
    updateSubTask,
    deleteSubTask,
    getTaskByUserId } = require('../controllers/taskController');
const router = express.Router();
const { AuthUtil } = require('../utils/auth');

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.get('/sub_task', getSubTask);
router.get('/sub_task/:id', getSubTaskById);
router.get('/sub_task/taskId/:task_id', getSubTaskByTaskId);
router.get('/user/:user_id', getTaskByUserId);
router.post('/available-users', getAvailableUsers);
router.post('/sub_task', createSubTask);
router.put('/:id', (req, res) => updateTask(req, res, req.io));
router.put('/sub_task/:id', updateSubTask);
router.delete('/:id', deleteTask);
router.delete('/sub_task/:id', deleteSubTask);

module.exports = router;
