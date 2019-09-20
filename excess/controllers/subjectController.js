const Subject = require('../models/subject');
const mongoose = require('mongoose');
const objectid = require('mongoose').Types.ObjectId;
//const bodyparser = require('body-parser');

exports.getSubjects = (req, res, next) => {
  Subject.find()
    .select('_id sub sub_id')
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.postSubjects = (req, res, next) => {
  const subject = new Subject({
    _id: new mongoose.Types.ObjectId(),
    sub: req.body.sub,
    sub_id: req.body.sub_id
  });
  subject
    .save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.getsinglesubject = (req, res, next) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`no record with this id : ${req.params.id}`);
  Subject.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        'Error in Retriving Subject ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
};

exports.putSubjects = (req, res, next) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`no record with this id : ${req.params.id}`);

  const subject = {
    sub: req.body.sub,
    sub_id: req.body.sub_id
  };

  Subject.findByIdAndUpdate(
    req.params.id,
    { $set: subject },
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

exports.deleteSubjects = (req, res) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`NO RECORD WITH GIVEN ID: ${req.params.id}`);
  Subject.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(`deleted item of id: ${req.params.id}`);
    } else {
      console.log('Error in Delete Data' + JSON.stringify(err, undefined, 2));
    }
  });
};
