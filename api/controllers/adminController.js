const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Admin = require('../models/admin');

module.exports.adminRegister = (req, res, next) => {
  var user = new Admin();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code == 11000)
        res.status(422).send(['Duplicate email adrress found.']);
      else return next(err);
    }
  });
};

module.exports.adminAuthenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate('adminStrategy', (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user) return res.status(200).json({ token: user.generateJwt() });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.adminProfile = (req, res, next) => {
  Admin.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: 'Admin record not found.' });
    else
      return res
        .status(200)
        .json({ status: true, user: _.pick(user, ['fullName', 'email']) });
  });
};
