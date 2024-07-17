const mongoose = require('mongoose');


const LectureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    teacher: { type: string},
    mode: {
    type: String, required: true ,enum:['Online','Offline']
    }
});


module.exports = mongoose.model("Lecture", LectureSchema);
