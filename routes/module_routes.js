
const express = require ('express');
const ModuleController = require('../controller/modulecontroller')
// const authorise = require('../middleware/authorise')

const modulerouter = express.Router();

modulerouter.post('/addmodule',ModuleController.addModule);

modulerouter.get('/getmodule',ModuleController.getModule);

modulerouter.put('/updatemodule/:id',ModuleController.updateModule);

modulerouter.delete('/deletemodule/:id',ModuleController.deleteModule);

modulerouter.post('/:id/assignlecture',ModuleController.assignLecture);

modulerouter.get('/:id/getlecture',ModuleController.getAssignedLectures);

modulerouter.delete('/:id/deletelecture',ModuleController.deleteUserLecture);

modulerouter.put('/:id/updatelecture', ModuleController.updateLecture);

module.exports = modulerouter;