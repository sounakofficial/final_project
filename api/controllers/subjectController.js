const Subject = require('../models/subject');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

exports.getSubjects = (req, res, next) => {
  Subject.find()
    .select('_id sub')
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
    sub: req.body.sub
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
