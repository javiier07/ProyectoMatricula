const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  maxCredits: {
    type: Number,
    default: 18
  },
  status: {
    type: String,
    default: 'active'
  }
});

const Career = mongoose.model('Career', careerSchema);
module.exports = Career;