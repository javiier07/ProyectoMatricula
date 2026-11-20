const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  enrollmentStart: {
    type: Date,
    required: true
  },
  enrollmentEnd: {
    type: Date,
    required: true
  },
  withdrawalDeadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'open'
  }
});

const Period = mongoose.model('Period', periodSchema);
module.exports = Period;