const Teacher = require('../models/teacher');
const mongoose = require('mongoose');
const objectid = require('mongoose').Types.ObjectId;

exports.getTeachers = (req, res, next) => {
  Teacher.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      'Error in Retriving Employess:' + JSON.stringify(err, undefined, 2);
    }
  });
};

exports.postTeacher = (req, res, next) => {
  var tchr = new Teacher({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    subject: req.body.subject,
    email: req.body.email,
    password: req.body.password
  });

  tchr.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Saving Data' + JSON.stringify(err, undefined, 2));
    }
  });
};

exports.getSingleTeacher = (req, res, next) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`no record with this id : ${req.params.id}`);
  Teacher.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        'Error in Retriving Subject ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
};

exports.putTeacher = (req, res, next) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`no record with this id : ${req.params.id}`);

  const tchr = {
    name: req.body.name,
    subject: req.body.subject,
    email: req.body.email,
    password: req.body.password
  };

  Teacher.findByIdAndUpdate(
    req.params.id,
    { $set: tchr },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          'Error in Updaing Data' + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
};

exports.deleteTeacher = (req, res) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`NO RECORD WITH GIVEN ID: ${req.params.id}`);
  Teacher.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(`deleted item of id: ${req.params.id}`);
    } else {
      console.log('Error in Delete Data' + JSON.stringify(err, undefined, 2));
    }
  });
};
