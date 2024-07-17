
const express = require ('express');
const userController = require('../controller/usercontroller')
const authorise = require('../middleware/authorise')

const router = express.Router();

router.get('/getallusers',userController.getusers);

router.put('/updateuser/:id',userController.updateuser);

router.delete('/deleteuser/:id',userController.deleteusers);

router.post('/register',userController.adduser);

router.patch('/:id/assigncourse',userController.assignCourse);

router.post('/login',userController.loginStudent);

router.delete('/:id/deletecourse',userController.deleteusercourse);

router.put('/:id/updateCourse',userController.updateCourse);

router.get('/:id/updateCourse',userController.getAssignedCourse);

module.exports = router;