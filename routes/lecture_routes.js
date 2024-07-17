
const express = require ('express');
const LectureController = require('../controller/lecturecontroller')
// const authorise = require('../middleware/authorise')

const lecturerouter = express.Router();

lecturerouter.post('/add',LectureController.checkTeacherRole, LectureController.addLecture);

lecturerouter.get('/getlecture',LectureController.getLecture);

lecturerouter.put('/updatelecture/:id',LectureController.updateLecture);

lecturerouter.delete('/deletelecture/:id',LectureController.deleteLecture);



module.exports = lecturerouter;
