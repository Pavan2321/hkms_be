const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,    
        required: true
    },
    description: {
        type: String,
        default: null
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Facility", FacilitySchema);