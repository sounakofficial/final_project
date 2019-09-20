const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultContoller');

router.get('/:email', resultController.getResult);
router.post('/', resultController.newResult);
// router.get('/:id', resultController.getSingleQuestion);
// router.put('/:id', resultController.putQuestion);
// router.delete('/:id', resultController.deleteQuestion);

module.exports = router;
