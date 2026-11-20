const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  prerequisiteIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  careerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    required: true
  },
  status: {
    type: String,
    default: 'active'
  }
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;