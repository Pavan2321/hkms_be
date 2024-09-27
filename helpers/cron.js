// cron.js

const cron = require('node-cron');
const Task = require('../models/Task'); // Import the Task model

// Cron job runs every day at midnight (adjust as needed)
cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date();
    // Find tasks that have `repeated_task` set to daily
    const repeatedTasks = await Task.find({
      repeated_task: 'daily',
      date: { $lt: today }, // Ensure tasks are only repeated after their date passes
    });

    // Duplicate each task for the next day
    repeatedTasks.forEach(async (task) => {
      const newTaskDate = new Date();
      newTaskDate.setDate(today.getDate() + 1); // Set date to the next day

      const newTask = new Task({
        ...task.toObject(), // Copy the task data
        date: newTaskDate,  // Update the date for the next instance
        _id: undefined,     // Remove the old task's ID
        createdAt: undefined,
        updatedAt: undefined,
      });

      await newTask.save(); // Save the repeated task for the next day
    });

    console.log('Daily repeated tasks created successfully.');
  } catch (error) {
    console.error('Error while creating repeated tasks:', error);
  }
});
