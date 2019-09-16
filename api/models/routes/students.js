const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getStudents);
router.post('/', studentController.postStudent);
router.get('/:id', studentController.getSingleStudent);
router.put('/:id', studentController.putStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
