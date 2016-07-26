var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var techSchema = mongoose.Schema({
  techName: {type: String, unique: true, required: true },
  skill: String,
  subskill: String
});

var Technology = mongoose.model('Technology', techNameSchema);

module.exports = Technology;
