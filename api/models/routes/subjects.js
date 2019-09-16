const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.get('/', subjectController.getSubjects);
router.post('/', subjectController.postSubjects);
router.get('/:id', subjectController.getsinglesubject);
router.put('/:id', subjectController.putSubjects);
router.delete('/:id', subjectController.deleteSubjects);
module.exports = router;
