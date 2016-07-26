var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var groupSchema = mongoose.Schema({
  groupName: {type: String, unique: true, required: true },
  groupURL: String,
  groupContact: String,
  approved: {type: Boolean, default: false},
  created: Date
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
