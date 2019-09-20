const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
//const mongoose = require('mongoose');

const Admin = require('../models/admin');
const Student = require('../models/student');

passport.use(
  'adminStrategy',
  new localStrategy({ usernameField: 'email' }, (username, password, done) => {
    Admin.findOne({ email: username }, (err, user) => {
      if (err) return done(err);
      else if (!user)
        return done(null, false, { message: 'Email is not registered' });
      else if (!user.verifyPassword(password))
        return done(null, false, { message: 'Wrong password.' });
      else return done(null, user);
    });
  })
);

passport.use(
  'studentStrategy',
  new localStrategy({ usernameField: 'email' }, (username, password, done) => {
    Student.findOne({ email: username }, (err, user) => {
      if (err) return done(err);
      else if (!user)
        return done(null, false, { message: 'Email is not registered' });
      else if (!user.verifyPassword(password))
        return done(null, false, { message: 'Wrong password.' });
      else return done(null, user);
    });
  })
);
