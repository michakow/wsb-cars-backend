const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  model: String,
  year: Date,
  producent: String,
  weight: Number,
  color: String,
});

module.exports = mongoose.model('Car', carSchema);
