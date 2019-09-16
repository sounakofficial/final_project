const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  /*subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  */
  sub_id: { type: String, required: true },
  question: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  answer: { type: String, required: true }
});

module.exports = mongoose.model('CreateQues', questionSchema);
