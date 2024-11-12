const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    task_id: {
        type: String,
        required: true
    },
    assigned_to: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    },
    start_time: {
        type: Date,
        required: false
    },
    end_time: {
        type: Date,
        required: false
    },
    facility_id: {
        type: [String],
        required: false
    },
    service_id: {
        type: [String],
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('sub_task', subTaskSchema);