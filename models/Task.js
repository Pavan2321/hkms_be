const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  id:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  },
  date: {
    type: Date,
  },
  start_time: {
    type: String,
    default: null
  },
  end_time: {
    type: String,
    default: null
  },
  assigned_by: {
    type: String,
  },
  assigned_to: {
    type: [String],
    required: false
  },
  duration: {
    type: Number,
  },
  facility_id: {
    type: [String],
    required: false
  },
  service_id: {
    type: [String],
    required: false
  },
  priority: {
    type: String,
    default: null,
  },
  repeate_interval: {
    type: Number,
    default: null,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
