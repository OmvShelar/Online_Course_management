
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { type } = require('os'); 

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    modules: [{
        index: { type: Number },
        moduleid: { type: String }
    }]
});


module.exports = mongoose.model("Course", CourseSchema);
