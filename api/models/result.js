const mongoose = require('mongoose');
const resultSchema = mongoose.Schema({
  email: { type: String },
  qid: { type: String },
  uanswer: { type: String },
  canswer: { type: String },
  marks: { type: Number },
  category_id: { type: String }
});
module.exports = mongoose.model('Result', resultSchema);
