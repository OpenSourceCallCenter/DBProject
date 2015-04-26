var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var newSession = require('client-sessions');
var cookieParser = require('cookie-parser');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var contacts = require('./routes/contacts');
var nib = require('nib');
var nodemailer = require('nodemailer');

var routes = require('./routes/index');
var users = require('./routes/users');
var signin = require('./routes/signin');
var signup = require('./routes/signup');
var businesslogin = require('./routes/businesslogin');
var useroptions = require('./routes/useroptions');
var businessadmin = require('./routes/businessadmin');
var businessview = require('./routes/businessview');
var myinfo = require('./routes/myinfo');
var invalidatecoupon = require('./routes/invalidate');
var oldfliers = require('./routes/oldfliers');
var prepflier = require('./routes/prepflier');

var app = express();

//var bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(express.favicon());
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(newSession({
  cookieName: 'newSession',
  secret: 'urbanbeatsdbapplication',
  duration: 24*60*60*1000,
  activeDuration: 1000*60*5
}));
app.use(express.static(path.join(__dirname, 'public')));

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

// Use Stylus, which compiles .styl --> CSS
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);
app.get('/', routes.do_work);

// for sign-in registered user
app.get('/signin', signin.do_work);
app.post('/signinuser', signin.do_authenticate);

// for registering a new user
app.get('/signup', signup.do_work);
app.post('/signupuser', signup.do_register);

// for sign-in registered business
app.get('/businesslogin', businesslogin.do_work);
app.post('/businessauthenticate', businesslogin.do_authenticate);

//app.get('/useroptions', businesslogin.do_work);

// contacts redirect
app.get('/contacts', contacts.do_work);

// business Admin page 
app.get('/businessadmin', businessadmin.do_work);
app.post('/businessregister', businessadmin.do_register);

app.get('/businessview', businessview.do_work);

app.get('/myinfo', myinfo.do_work);
app.get('/invalidate', invalidatecoupon.do_work);

app.get('/oldfliers', oldfliers.do_work);
app.post('/updateflier', oldfliers.do_updateflier);

app.get('/prepflier', prepflier.do_work);
app.post('/addflier', prepflier.do_addflier);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
