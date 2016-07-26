var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var group = require('../models/Groups');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//from createUserController
router.get('/:selectedTag', function(req, res) {
    var results = [];

    pg.connect(connection, function(err, client, done) {

        var query = client.query("SELECT lesson.lesson_id, lesson.title, lesson.author, lesson.published, lesson.materials, lesson.resource, lesson.status FROM lesson JOIN lesson_tag ON lesson.lesson_id = lesson_tag.fk_lesson_id JOIN tag ON lesson_tag.fk_tag_id = tag.tag_id WHERE tag.tag_id = ($1) AND lesson.status = 'published'",
            [req.params.selectedTag]);

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();

            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;
// router.post('/createGroup', function (req, res) {
// console.log('inside groups.js add group ');
//   console.log(req.body);
//
//   var newGroup = new group({
//     groupName: req.body.groupName,
//     groupURL: req.body.groupURL,
//     groupContact: req.body.groupContact
//   });
//
// console.log( 'newGroup: ', newGroup );
//   newGroup.save(function(err) {
//
//     if(err) {
//       console.log(err);
//       res.sendStatus(500);
//     } else {
//       res.json(newGroup);
//     }
//   });
// });//end of post createGroup
//
// router.delete('/deleteGroup/:groupId', function(req, res){
//   console.log('In /deleteGroup/:groupId: ', req.params.groupId);
//   var id = req.params.groupId;
//   group.findOne({'_id': id}, function(err, groupon){
//     if(err){
//       console.log('/deleteGroup error: ', err);
//     }else{
//       group.remove({'_id': id}, function(err){
//         if(err){
//           console.log('remove group error: ', err);
//         }else{
//         }
//       });
//     }
//   });
// });

module.exports = router;
