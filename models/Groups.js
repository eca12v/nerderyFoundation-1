var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var groupSchema = mongoose.Schema({
  name: {type: String, unique: true, required: true },
  groupURL: String,
  groupContact: String,
  contactEmail: String,
  description: String,
  location: String,
  activities: {type: Array},
  technologies: {type: Array},
  tags: {type: Array},
  freqOfMeeting: String,
  sizeOfMeeting: String,
  affiliations: String,
  affiliationURL: String,
  eventInfo: String,
  sizeOfMembership: String,
  photoURL: String,
  approved: {type: Boolean, default: false},
  created: Date,
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
