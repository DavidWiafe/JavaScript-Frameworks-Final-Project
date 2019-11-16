'use strict';
/* 
 File Name: register.js
 Author: David Wiafe
 Description: Handle register GET & POST request. 
              Allow users to create an Account.
*/

var express = require('express');
var router = express.Router();

// require - account schema
var Account = require('../models/account');

// require npm - password-hash
var passwordHash = require('password-hash');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('register');
});

/* POST: create the Account  */
router.post('/', function (req, res) {

    // store the password user enters into a variable
    var passWord = req.body.password;

    //store the hashed version of the password into a variable
    var hashedPassword = passwordHash.generate(passWord);

    console.log(hashedPassword);

    // insert an account in the account table
    Account.create({
        /* store the entered username 
           and hased pasword into account schema
        */
        username: req.body.userName,
        password: hashedPassword

    }, function (err, Account) {

        if (err) {
            console.log(err);
        } else {
            console.log('User added : ' + Account);
            res.redirect('/');
        }
    });

});


module.exports = router;