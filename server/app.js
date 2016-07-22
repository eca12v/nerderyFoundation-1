var express = require('express');
var app=express();
var path = require('path');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
var mongoose = require('mongoose');
// 27017 is default mongo port
mongoose.connect('mongodb://teamNerd:nerdery99@ds027175.mlab.com:27175/nerdery_foundation', function(err,db){
    if (!err){
        console.log('Connected to database: nerdery_foundation');
    } else{
        console.dir(err);
    }
});
// var connectDB = connection string goes here;
// mongoose.connect(connectDB);

var groups = require('../routes/groups');
var users = require('../routes/users');

app.use('/groups', groups);
app.use('/users', users);

// spin up server
app.listen( process.env.PORT || 8080, function( req, res ){
  console.log( 'listening on 8080' );
});

app.get('/', function(req, res){
  res.sendFile(path.resolve('public/index.html'));
});//end of main URL

// static folder
app.use( express.static( 'public' ) );
