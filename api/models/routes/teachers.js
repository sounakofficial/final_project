const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacherController');

router.get('/', TeacherController.getTeachers);
router.post('/', TeacherController.postTeacher);
router.get('/:id', TeacherController.getSingleTeacher);
router.put('/:id', TeacherController.putTeacher);
router.delete('/:id', TeacherController.deleteTeacher);

module.exports = router;
