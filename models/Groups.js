var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var groupSchema = mongoose.Schema({
  name: {type: String, unique: true, required: true },
  groupURL: {type: String, unique: true, required: true},
  groupContact: {type: String, required: true},
  contactEmail: {type: String, required: true},
  description: {type: String, required: true},
  location: {type: String, required: true},
  activities: {type: Array},
  technologies: {type: Array, required: true},
  coreTechnologies: {type: Array},
  tags: {type: Array},
  freqOfMeeting: String,
  sizeOfMeeting: {type: String, required: true},
  affiliations: String,
  affiliationURL: String,
  eventInfo: String,
  sizeOfMembership: String,
  photoURL: String,
  approved: {type: Boolean, default: false},
  flags: {type: Number, default: 0},
  submitterID:  String,
  created: Date,
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
