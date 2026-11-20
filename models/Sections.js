const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  periodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Period',
    required: true
  },
  sectionCode: {
    type: String,
    required: true
  },
  teacherName: {
    type: String,
    required: true
  },
  schedule: [{
    day: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  }],
  classroom: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  enrolledCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'active'
  }
});

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;