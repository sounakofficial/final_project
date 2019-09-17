const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sub: { type: String, required: true },
  sub_id: { type: String, required: true }
});

module.exports = mongoose.model('Subject', subjectSchema);
