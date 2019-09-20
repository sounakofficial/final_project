const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/', questionController.getQuestions);
router.post('/', questionController.postQuestions);
router.get('/:id', questionController.getSingleQuestion);
router.put('/:id', questionController.putQuestion);
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
