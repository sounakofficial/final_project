const Student = require('../models/student');
const mongoose = require('mongoose');
const objectid = require('mongoose').Types.ObjectId;

exports.getStudents = (req, res, next) => {
  Student.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      'Error in Retriving Employess:' + JSON.stringify(err, undefined, 2);
    }
  });
};

exports.postStudent = (req, res, next) => {
  var stu = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    password: req.body.password
  });

  stu.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Saving Data' + JSON.stringify(err, undefined, 2));
    }
  });
};

exports.getSingleStudent = (req, res, next) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`no record with this id : ${req.params.id}`);
  Student.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        'Error in Retriving Subject ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
};

exports.putStudent = (req, res, next) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`no record with this id : ${req.params.id}`);

  const stu = {
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    password: req.body.password
  };

  Student.findByIdAndUpdate(
    req.params.id,
    { $set: stu },
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

exports.deleteStudent = (req, res) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`NO RECORD WITH GIVEN ID: ${req.params.id}`);
  Student.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(`deleted item of id: ${req.params.id}`);
    } else {
      console.log('Error in Delete Data' + JSON.stringify(err, undefined, 2));
    }
  });
};
