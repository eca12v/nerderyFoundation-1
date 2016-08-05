var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  admin: {type: Boolean, default: false},
  active: {type: Boolean, default: true},
  google: String,
  hash: String,
  salt: String,
  joined_on: Date
});

UserSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var now = new Date();
  var exp = now.getTime() + 10000;
  // exp.setSeconds(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    admin: this.admin
  }, 'SECRET', {expiresIn: 30000 });
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
