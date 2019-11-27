'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
var users = require('./routes/users');

// custom model requires
var Account = require('./models/account');

var register = require('./routes/register');

var login = require('./routes/login');

var media = require('./routes/media');

// require npm - mongoose
var mongoose = require('mongoose');

// require npm - passport
var passport = require('passport');

// require npm - passport-local
var LocalStrategy = require('passport-local').Strategy;

// require npm - express-session
var session = require('express-session');

// require npm - password-hash
var passwordHash = require('password-hash');

//set connection to localhost/Lesson6 DB in mongoDB
//mongoose.connect('mongodb://localhost/Lesson6');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// npm - passport required for passport session
app.use(session({
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

//app.use('/', routes);
app.use('/users', users);

app.use('/register', register);
app.use('/login', login);
app.use('/', media);

// passport - Serialize user
passport.serializeUser(function (user, done) {
    done(null, user.id)
});

/* 
  passport - Deserialize user
  find username
*/
passport.deserializeUser(function (id, done) {
    Account.findById(id, function (err, user) {
        done(err, user);
    });
});

/* 
  Passport - Local strategy 
  allow users to login into the site
 */
passport.use(new LocalStrategy(

    function (username, password, done) {

        // match on username
        Account.findOne({
            username: username
        }, function (err, user) {

            if (!user) {
                return done(null, false);
            }

            if (err) {
                return done(err);
            }
            console.log("user password: " + user.password);
            console.log("password: " + password);
            console.log("1st password Pass?:" + verifyPassword(password, user.password));
            console.log("1st in a half password Pass?:" + !verifyPassword(password, user.password));
            /*if (user.password != password) {
                return done(null, false);
            }*/
            // if the password for that username is incorret: fail
            if (verifyPassword(password, user.password) == false) {
                return done(null, false);
            }

            console.log("2nd password Pass?:" + verifyPassword(password, user.password));

            return done(null, user);

        });
    }
));

//verify the hased password
function verifyPassword(userPassword, hashedPassword) {

    console.log("func user password:" + userPassword);

    console.log("func Hashed password:" + hashedPassword);

    /* 
      param 1 = typed password by the user
      param 2 = hashed password in the database
      returns a bool value
    */
    return passwordHash.verify(userPassword, hashedPassword);

}

//connect to my live mongoDB server
const uri = "mongodb+srv://David_Wiafe:SuperStrongPass123@cluster0-wgaad.mongodb.net/test?retryWrites=true&w=majority";
var db = mongoose.connect(uri).catch((error) => { console.log(error); });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
