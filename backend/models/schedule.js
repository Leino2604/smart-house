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
    enum: [0, 1, 2, 3, 4, 5]
  },
  light: {
    type: Boolean,
    required: true,
  },
  notification: {
    type: Boolean,
    required: true,
  }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;