const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
  
});

const Statistic = mongoose.model('Statistic', statisticSchema);

module.exports = Statistic;