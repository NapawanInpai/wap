const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
    unique: true,
    default: null
  },
  full_name: {
    type: String,
    required: true,
    default: null
  },
  email: {
    type: String,
    required: true,
    default: null
  },
  major: {
    type: String,
    required: true,
    default: null
  },
  gpa: {
    type: Number,
    required: true,
    default: null,
    min: 0,
    max: 4
  },
  enroll_year: {
    type: Number,
    required: true,
    default: null
  },
  status: {
    type: String,
    required: true,
    enum: ['กำลังศึกษา'],
    default: 'กำลังศึกษา'
  }
}, {
  timestamps: true,
  versionKey: false,
  default: null
});

module.exports = mongoose.model('students', StudentSchema);
