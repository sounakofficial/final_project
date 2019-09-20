const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', studentController.studentRegister);
router.post(
  '/authenticate',
  jwtHelper.verifyJwtToken,
  studentController.studentAuthenticate
);
router.get('/profile', studentController.studentProfile);
module.exports = router;