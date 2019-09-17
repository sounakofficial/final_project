const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', adminController.adminRegister);
router.post('/authenticate', adminController.adminAuthenticate);
router.get('/profile', jwtHelper.verifyJwtToken, adminController.adminProfile);

module.exports = router;
