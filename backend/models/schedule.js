const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  hour: {
    type: Number,
    required: true
  },
  minute: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  repeat: {
    type: [String],
    required: true
  },
  fan: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3]
  },
  light: {
    type: Number,
    required: true,
    enum: [0, 1]
  },
  notification: {
    type: Number,
    required: true,
    enum: [0, 1]
  }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;