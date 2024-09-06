const Task = require('../models/Task');
const ResUtil = require('../utils/res');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    if (!req.body.title) {
      return ResUtil.VALIDATION_ERROR(req, res, { message: 'title is requried' }, 'VALIDATION_ERROR')
    }
    const newTask = new Task(req.body);
    const task = await newTask.save();
    res.status(201).json(task);
    ResUtil.SUCCESS(req, res, { task }, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR_ON_CREATE_TASK")
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    ResUtil.SUCCESS(req, res, { tasks }, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return ResUtil.NOT_FOUND(req, res, { message: 'Task not found' }, 'ERROR')
    }
    ResUtil.SUCCESS(req, res, { task }, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return ResUtil.NOT_FOUND(req, res, { message: 'Task not found' }, 'ERROR')
    }
    ResUtil.SUCCESS(req, res, { task }, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return ResUtil.VALIDATION_ERROR(req, res, { message: 'Task not found' }, 'ERROR')
    }
    ResUtil.SUCCESS(req, res, {}, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
  }
};
