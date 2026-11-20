const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  enrollmentCode: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  periodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Period',
    required: true
  },
  status: {
    type: String,
    default: 'CONFIRMED'
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  totalCredits: {
    type: Number,
    default: 0
  },
  subjects: [{
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: true
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    credits: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: 'ACTIVE'
    }
  }]
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;