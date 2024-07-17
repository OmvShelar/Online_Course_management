
const express = require ('express');
const LectureController = require('../controller/lecturecontroller')
// const authorise = require('../middleware/authorise')

const lecturerouter = express.Router();

lecturerouter.post('/add',LectureController.addLecture);

lecturerouter.get('/getlecture',LectureController.getLecture);

lecturerouter.put('/updatelecture/:id',LectureController.updateLecture);

lecturerouter.delete('/deletelecture/:id',LectureController.deleteLecture);

// router.post('/register',userController.adduser);

// router.post('/login',userController.loginStudent);

module.exports = lecturerouter;
