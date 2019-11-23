'use strict';
/* 
 File Name: register.js
 Author: David Wiafe
 Description: Handle register GET & POST request. 
              Allow users to create an Account. 
*/

var express = require('express');
var router = express.Router();

// require npm - passport
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('login');
});

/* POST: Login Page
   Try to login using npm passport */
router.post('/', passport.authenticate('local', {

    //if login was successful send user to Home Page
    successRedirect: '/',

    //if login failed send user back to login page
    failureRedirect: '/login',
    failureMessage: 'Invalid Login Try Again'
}));


module.exports = router;
