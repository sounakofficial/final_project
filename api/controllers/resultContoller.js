const express = require('express');
var router = express.Router();
//var objectid=require('mongoose').Types.ObjectId;
const Result = require('../models/result');

module.exports.newResult = (req, res) => {
  var resul = new Result({
    email: req.body.email,
    qid: req.body.qid,
    uanswer: req.body.uanswer,
    canswer: req.body.canswer,
    marks: req.body.marks,
    category_id: req.body.category_id
  });
  resul.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Saving Data' + JSON.stringify(err, undefined, 2));
    }
  });
};
module.exports.getResult = (req, res) => {
  Result.aggregate(
    [
      { $match: { email: req.params.email } },
      {
        $group: {
          _id: '$category_id',
          marks: { $sum: '$marks' }
        }
      }
    ],
    function(err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
};
