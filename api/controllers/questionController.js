const Question = require('../models/question');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

exports.getQuestions = (req, res, next) => {
  Question.find()
    .select('_id subject question option1 option2 option3 option4 answer ')
    .populate('subject', '_id sub')
    .exec()
    .then(result => {
      return {
        _id: result._id,
        subject: result.subject,
        question: result.question,
        option1: result.option1,
        option2: result.option2,
        option3: result.option3,
        option4: result.option4,
        answer: result.answer
      };
    })
    .catch(err => {
      res.status(200).json({
        error: err
      });
    });
};

exports.postQuestions = (req, res, next) => {
  const Ques = new Question({
    _id: new mongoose.Types.ObjectId(),
    subject: req.body.subject,
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer
  });
  Ques.save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      res.status(200).json({
        error: err
      });
    });
};
