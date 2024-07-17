
const express = require ('express');
const courseController = require('../controller/coursecontroller')
// const authorise = require('../middleware/authorise')

const courserouter = express.Router();

courserouter.post('/addcourse',courseController.addCourse);

courserouter.get('/getcourse',courseController.getcourse);

courserouter.put('/updateuser/:id',courseController.updatecourse);

courserouter.delete('/deleteuser/:id',courseController.deletecourse);

courserouter.delete('/assignmodule',courseController.assignModule);

courserouter.delete('/deletemodule:id',courseController.deleteUserModule);

courserouter.delete('/getmodule/:id',courseController.getAssignedModules);

courserouter.delete('/updatetemodule/:id',courseController.updateModule);

module.exports = courserouter;