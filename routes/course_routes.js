
const express = require ('express');
const courseController = require('../controller/coursecontroller')
// const authorise = require('../middleware/authorise')

const courserouter = express.Router();

courserouter.post('/addcourse',courseController.addCourse);

courserouter.get('/getcourse',courseController.getcourse);

courserouter.put('/updateuser/:id',courseController.updatecourse);

courserouter.delete('/deleteuser/:id',courseController.deletecourse);

// router.post('/register',userController.adduser);

// router.post('/login',userController.loginStudent);

module.exports = courserouter;