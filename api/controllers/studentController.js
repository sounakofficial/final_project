const mongoose = require('mongoose');
const passport = require('passport');
const bodyparser = require('body-parser');
const _ = require('lodash');

const Student = require('../models/student');

module.exports.studentRegister = (req, res, next) => {
  var reguser = new Student();
  reguser.fullName = req.body.fullName;
  reguser.email = req.body.email;
  reguser.phone = req.body.phone;
  reguser.address = req.body.address;
  reguser.password = req.body.password;
  reguser.save().then(result=>{
    console.log(result)
  }).catch(err=>{
    res.status(500).json({
      error:err
    })
  });
};

module.exports.studentAuthenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate('studentStrategy', (err, reguser, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered reguser
    else if (reguser)
      return res.status(200).json({ token: reguser.generateJwt() });
    // unknown reguser or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.studentProfile = (req, res, next) => {
  Student.findOne({ _id: req._id, email:req.email }, (err, reguser) => {
    if (!reguser)
      return res
        .status(404)
        .json({ status: false, message: 'reguser record not found.' });
    else
      return res.status(200).json({
        status: true,
        reguser: _.pick(reguser, ['fullName', 'email'])
      });
  });
};
