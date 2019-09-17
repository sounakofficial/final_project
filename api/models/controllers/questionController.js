const Question = require('../models/question');
const mongoose = require('mongoose');
const objectid = require('mongoose').Types.ObjectId;
const bodyParser = require('body-parser');

exports.getQuestions = (req, res, next) => {
  Question.find()
    .select('_id sub_id question option1 option2 option3 option4 answer')
    //.populate('subject', '_id sub')
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

exports.postQuestions = (req, res, next) => {
  const Ques = new Question({
    _id: new mongoose.Types.ObjectId(),
    sub_id: req.body.sub_id,
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer
  });
  Ques.save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.getSingleQuestion = (req, res, next) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`no record with this id : ${req.params.id}`);
  Question.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        'Error in Retriving Subject ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
};

exports.putQuestion = (req, res, next) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`no record with this id : ${req.params.id}`);

  const ques = {
    sub_id: req.body.sub_id,
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer
  };

  Question.findByIdAndUpdate(
    req.params.id,
    { $set: ques },
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

exports.deleteQuestion = (req, res) => {
  if (!objectid.isValid(req.params.id))
    return res.status(400).send(`NO RECORD WITH GIVEN ID: ${req.params.id}`);
  Question.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(`deleted item of id: ${req.params.id}`);
    } else {
      console.log('Error in Delete Data' + JSON.stringify(err, undefined, 2));
    }
  });
};
