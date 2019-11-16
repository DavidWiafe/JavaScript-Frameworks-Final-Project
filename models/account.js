/* 
 File Name: account.js
 Author: David Wiafe
 Description: create account schema, allow users to login
 */

// require npm - mongoose
var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema(
    {
        username: String,
        password: String
    }
);

module.exports = mongoose.model('Account', AccountSchema);