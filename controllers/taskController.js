const Task = require('../models/Task');
const ResUtil = require('../utils/res');
const moment = require('moment');
const User = require('../models/User');
const SubTask = require('../models/subTask');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    if (!req.body.title) {
      return ResUtil.VALIDATION_ERROR(req, res, { message: 'title is requried' }, 'VALIDATION_ERROR')
    }
    const newTask = new Task(req.body);
    const task = await newTask.save();
    ResUtil.SUCCESS(req, res, { task }, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR_ON_CREATE_TASK")
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.aggregate([
      {
        $lookup: {
          from: "facilities",
          localField: "facility_id",
          foreignField: "id",
          as: "facilities"
        }
      },
      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "id",
          as: "services"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "assigned_to",
          foreignField: "user_id",
          as: "users"
        }
      },
    ]);
    if (!tasks) {
      return ResUtil.NOT_FOUND(req, res, { message: 'No tasks found' }, 'ERROR')
    }
    ResUtil.SUCCESS(req, res, { tasks }, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  const taskId = req.params.id;
    try {
      const tasks = await Task.aggregate([
        {
          $match: {
            id: taskId
          }
        },
        {
          $lookup: {
            from: "facilities",
            localField: "facility_id",
            foreignField: "id",
            as: "facilities"
          }
        },
        {
          $lookup: {
            from: "services",
            localField: "service_id",
            foreignField: "id",
            as: "services"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "assigned_to",
            foreignField: "user_id",
            as: "users"
          }
        },
      ]);
      if (!tasks) {
        return ResUtil.NOT_FOUND(req, res, { message: 'No tasks found' }, 'ERROR')
      }
      ResUtil.SUCCESS(req, res, { tasks }, "SUCCESS")
    } catch (error) {
      ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
    }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({id:req.params.id}, req.body, { new: true });
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
    const task = await Task.findOneAndDelete({id:req.params.id});
    if (!task) {
      return ResUtil.VALIDATION_ERROR(req, res, { message: 'Task not found' }, 'ERROR')
    }
    ResUtil.SUCCESS(req, res, {}, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
  }
};

exports.getAvailableUsers = async (req, res) => {
  try {
    // Get the current date
    const today = moment().startOf('day').toDate();    // Midnight today
    const tomorrow = moment().add(1, 'days').startOf('day').toDate();  // Midnight tomorrow

    // Fetch all tasks created today (assigned today)
    const tasks = await Task.find({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // Group tasks by userId (assigned_to)
    const tasksByUser = tasks.reduce((acc, task) => {
      if (!acc[task.assigned_to]) acc[task.assigned_to] = [];
      acc[task.assigned_to].push(task);
      return acc;
    }, {});

    // Fetch all users
    const users = await User.find();

    const availableTimes = [];

    for (const user of users) {
      const userId = user.user_id;
      const userTasks = tasksByUser[userId] || []; // Get user's tasks or empty array if no tasks

      // Sort tasks by start time
      userTasks.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

      const workingStartTime = moment().set({ hour: 9, minute: 0 });  // Start of workday (9 AM)
      const workingEndTime = moment().set({ hour: 18, minute: 0 });   // End of workday (6 PM)

      let availableSlots = [];
      let lastEndTime = workingStartTime;

      // Calculate available time between tasks
      userTasks.forEach(task => {
        const taskStart = moment(task.start_time);  // Task start time
        const taskEnd = moment(task.end_time);      // Task end time

        // Check if there's a gap between the last task and the current task
        if (taskStart.isAfter(lastEndTime)) {
          availableSlots.push({
            start: lastEndTime.format('HH:mm'),
            end: taskStart.format('HH:mm')
          });
        }

        lastEndTime = taskEnd;  // Update the last end time to the current task's end time
      });

      // If the last task ends before the workday ends, add the remaining time as available
      if (lastEndTime.isBefore(workingEndTime)) {
        availableSlots.push({
          start: lastEndTime.format('HH:mm'),
          end: workingEndTime.format('HH:mm')
        });
      }

      // If no tasks, the user is available the whole day
      if (userTasks.length === 0) {
        availableSlots.push({
          start: workingStartTime.format('HH:mm'),
          end: workingEndTime.format('HH:mm')
        });
      }

      // Save the available slots for this user
      availableTimes.push({
        name: `${user.first_name} ${user.last_name}`,
        availableSlots,
        user_id: userId
      });
    }

    res.json({ status: 'success', data: availableTimes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

exports.getSubTask = async(req, res) => {
  try {
    const subTasks = await SubTask.find();
    if (!subTasks) {
      return ResUtil.NOT_FOUND(req, res, { message: 'No subtasks found' }, 'ERROR')
    }
    ResUtil.SUCCESS(req, res, { subTasks }, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
  }
}

exports.createSubTask = async (req, res) => {
  try {
    if (!req.body.name && !req.body.task_id) {
      return ResUtil.VALIDATION_ERROR(req, res, { message: 'name and task id is required' }, 'VALIDATION_ERROR')
    }
    const newSubTask = new SubTask(req.body);
    const subTask = await newSubTask.save();
    ResUtil.SUCCESS(req, res, { subTask }, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR_ON_CREATE_SUBTASK")
  }
}

exports.getSubTaskById = async (req, res) =>{
  try {
    const subTask = await SubTask.findOne({id:req.params.id});
    if (!subTask) {
      return ResUtil.NOT_FOUND(req, res, { message: 'Subtask not found' }, 'ERROR')
    }
    ResUtil.SUCCESS(req, res, { subTask }, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
  }
}

exports.getSubTaskByTaskId = async(req, res) => {
  try {
    const subTasks = await SubTask.find({task_id: req.params.task_id});
    if (!subTasks) {
      return ResUtil.NOT_FOUND(req, res, { message: 'No subtasks found for this task' }, 'ERROR')
    }
    ResUtil.SUCCESS(req, res, { subTasks }, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
  }
}

exports.updateSubTask = async (req, res) => {
  try {
    const updatedSubTask = await SubTask.findOneAndDelete({id:req.params.id}, req.body, {new: true});
    if (!updatedSubTask) {
      return ResUtil.NOT_FOUND(req, res, { message: 'Subtask not found' }, 'ERROR')
    }
    ResUtil.SUCCESS(req, res, { updatedSubTask }, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
  }
}

exports.deleteSubTask = async (req, res) => {
  try {
    const deletedSubTask = await SubTask.findOneAndDelete({ id: req.params.id });
    if (!deletedSubTask) {
      return ResUtil.NOT_FOUND(req, res, { message: 'Subtask not found' }, 'ERROR')
    }
    ResUtil.SUCCESS(req, res, {}, "SUCCESS")
  } catch (error) {
    ResUtil.SERVER_ERROR(req, res, { message: error.message }, "ERROR")
  }
}
