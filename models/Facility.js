const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: null
    },
    details: {
        type: String,
        default: null
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Facility", FacilitySchema);