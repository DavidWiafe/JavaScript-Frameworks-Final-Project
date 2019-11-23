'use strict';
/* 
 File Name: media.js
 Author: David Wiafe
 Description: Handle register GET & POST request. 
              Media CRUD
*/
var express = require('express');
var router = express.Router();

// require - media schema
var Media = require('../models/media');

// require - account schema
var Account = require('../models/account');

router.get('/', function (req, res) {
    res.render('index', { boolValue: LoggedInUser(req) } );
});


/* GET home page. */
router.get('/media', function (req, res) {

    console.log("req = " + req.user.username);

    var date = new Date();

    var day = date.getDate();

    var month = date.getMonth() + 1;

    var year = date.getFullYear();

    var todaysDate = year +"-"+ month +"-"+ day;

    Media.find(function (err, mediaPosts) {

        if (err) {

            console.log(err);
        } else {

            // var theDate = mediaPosts.date;

            //theDate.toString();

            res.render('media', { posts: mediaPosts, username: req.user.username, todayDate: todaysDate, boolValue: LoggedInUser(req)  });
        }

    });

    //res.render('media', { username: req.user.username, todayDate: todaysDate} );
});


// POST: add a new media post
router.post('/media/add', function (req, res) {

    console.log("test the date: " + req.body.dateTest);

    //res.render('media');

    Media.create({


        username: req.body.username,

        date: req.body.theDate,

        message: req.body.messageText


    }, function (err, MediaPost) {

        if (err) {

            console.log(err);
        } else {

            res.render('add', { post: MediaPost.message });
        }
    });
});

//GeET: Media/add screen
router.get('/media/add', function (req, res) {

    res.redirect('add');


});

//GET: Post screen
router.get('/post', function (req, res) {

    var userName;

    if (req.user) {
        console.log('username' + req.user.username);

        userName = req.user.username;
    }
    if (userName == null) {
        userName = 'no one';
    } 

    Media.find(function (err, mediaPosts) {

        if (err) {

            console.log(err);
        } else {

            // var theDate = mediaPosts.date;

            //theDate.toString();

            res.render('post', { posts: mediaPosts, loggedInUserName: userName, boolValue: LoggedInUser(req)  } );
        }

    });


});

// GET: Edit the selected post
router.get('/media/edit/:id', function (req, res) {

    console.log('did it click?');

    if (LoggedInUser(req)) {
        
        var id = req.params.id;


        Media.findById(id, function (err, MediaPost) {

            if (err) {

                res.send(' Media Post: ' + id + 'not found!');

            } else {

                res.render('edit', { onEdit: MediaPost, boolValue: LoggedInUser(req) });
            }
        });

    } else {

        res.redirect('/');

    }

});

// POST: save the edit
router.post('/media/edit', function (req, res) {

    console.log('2nd did it click?');

    var id = req.body.object_id;

    var editThisPost = {

        _id: id,

        message: req.body.message

    };

    Media.updateOne({

        _id: id

    }, editThisPost, function (err) {

        if (err) {

            console.log(err);
        } else {

            res.redirect('/');

        }

    });

});

//GET: Delete a media post
router.get('/media/delete/:id', function (req, res) {

    var id = req.params.id;

    Media.deleteOne({

        _id: id

    }, function (err) {

        if (err) {

            console.log('Failed Media Post ID: ' + id);

        } else {

            res.redirect('/post');

        }

     });


});






/* Check if the user is logged in or not */
function LoggedInUser(req) {

    if (req.isAuthenticated()) {

        return true;

    } else {

        return false;
    }
}


module.exports = router;