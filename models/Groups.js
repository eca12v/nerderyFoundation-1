var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
  groupName: {type: String, unique: true, required: true },
  groupURL: String,
  groupContact: String
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
