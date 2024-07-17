
const express = require ('express');
const ModuleController = require('../controller/modulecontroller')
// const authorise = require('../middleware/authorise')

const courserouter = express.Router();

modulerouter.post('/addmodule',ModuleController.addCourse);

modulerouter.get('/getmodule',ModuleController.getcourse);

modulerouter.put('/updatemodule/:id',ModuleController.updatecourse);

modulerouter.delete('/deletemodule/:id',ModuleController.deletecourse);

// router.post('/register',userController.adduser);

// router.post('/login',userController.loginStudent);

module.exports = courserouter;