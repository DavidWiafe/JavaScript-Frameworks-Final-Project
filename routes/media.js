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
    res.render('index' );
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

            res.render('media', { posts: mediaPosts, username: req.user.username, todayDate: todaysDate } );
        }

    });
   
   // res.render('media', { username: req.user.username, todayDate: todaysDate} );
});


// POST: add a new media post
router.post('/media/add', function (req, res) {

    console.log("test the date: " + req.body.dateTest);

    res.render('media');

    Media.create({


        username: req.body.username,

        date: req.body.theDate,

        message: req.body.messageText


    }, function (err, MediaPost) {

        if (err) {

            console.log(err);
        } else {

            res.render('media', { post: MediaPost });
        }


    });

    


});


// get the login in user name
function getUserName() {

    


}

/* Check if the user is logged in or not */
function LoggedInUser(req) {

    if (req.isAuthenticated()) {

        return true;

    } else {

        return false;
    }
}


module.exports = router;