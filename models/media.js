/* 
 File Name: account.js
 Author: David Wiafe
 Description: create media schema. Users will post info about themselves like status
 */

// require npm - mongoose
var mongoose = require('mongoose');

var MediaSchema = new mongoose.Schema(
    {
        username: String,
        date: Date,
        message: String
    }
);

module.exports = mongoose.model('Media', MediaSchema);