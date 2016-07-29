var express = require('express');
var app=express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

require('../models/Users');
require('../passport/config');

// 27017 is default mongo port

var connectionString = 'mongodb://localhost:27017/nerdery';
var connectionStringMLab = 'mongodb://teamNerd:nerdery99@ds027175.mlab.com:27175/nerdery_foundation';
mongoose.connect(connectionStringMLab, function(err,db){

    if (!err){
        console.log('Connected to database: nerdery_foundation');
    } else{
        console.dir(err);
    }
});
// mongoose.connect('mongodb://teamNerd:nerdery99@ds027175.mlab.com:27175/nerdery_foundation', function(err,db){
//     if (!err){
//         console.log('Connected to database: nerdery_foundation');
//     } else{
//         console.dir(err);
//     }
// });
// var connectDB = connection string goes here;
// mongoose.connect(connectDB);

var groups = require('../routes/groups');
var auth = require('../routes/auth');

app.use( bodyParser.json() );
app.use( express.static( 'public' ) );
app.use(passport.initialize());
app.use('/groups', groups);
app.use('/auth', auth);

// spin up server
app.listen( process.env.PORT || 8080, function( req, res ){
  console.log( 'listening on 8080' );
});

app.get('/', function(req, res){
  res.sendFile(path.resolve('public/index.html'));
});//end of main URL
