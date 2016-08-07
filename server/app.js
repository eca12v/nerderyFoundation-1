var express = require('express');
var app=express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

require('dotenv').load();//loads environment variables locally
// load users and passport
require('../models/Users');
require('../passport/config');
// load routers
var groups = require('../routes/groups');
var auth = require('../routes/auth');
// connection string options
var connectionString = 'mongodb://localhost:27017/nerdery';
var connectionStringMLab = 'mongodb://teamNerd:nerdery99@ds027175.mlab.com:27175/nerdery_foundation';
// connect to db
mongoose.connect(connectionStringMLab, function(err,db){
    if (!err){
        console.log('Connected to database: nerdery_foundation');
    } else{
        console.dir(err);
    }
});
// app middleware
app.use( bodyParser.json() );
app.use( express.static( 'public' ) );
app.use(passport.initialize());
app.use('/groups', groups);
app.use('/auth', auth);
// server angular app
app.get('/', function(req, res){
  res.sendFile(path.resolve('public/index.html'));
});
// spin up server
app.listen( process.env.PORT || 8080, function( req, res ){
  console.log( 'listening on 8080' );
});
