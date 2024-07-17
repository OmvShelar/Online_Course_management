
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { type } = require('os');

const ModuleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    subject: { type: string},
    lectures: [{
        index: { type: Number },
        lectureid: { type: String }
    }]
});


module.exports = mongoose.model("Module", ModuleSchema);
