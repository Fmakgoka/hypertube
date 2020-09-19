var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var cookieSession = require('cookie-session');
var session = require('express-session');
const passportSetup = require('./model/passport-setup');

const keys = require('./model/key');
const passport = require('passport');


var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var authRouter = require('./routes/auth');
var homepageRouter = require('./routes/homepage');
var forgotpasswordRouter = require('./routes/forgotpassword');
var activateaccRouter = require('./routes/activateAccount')
var passwordRouter = require('./routes/password');
const key = require('./model/key');
const con = require('./model/connect');

var app = express();

app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys: [key.session.cookieKey]
}))

const sessionFunction = function(req, res, next){
  if (req.session.login){
    console.log('Welcome back,' + req.session.username+ '!');
    next()
  }else{
    console.log('please login to view this page');
    res.redirect("http://localhost:3000/login");
  }
}

//initialize passport
app.use(passport.initialize())
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', registerRouter)
app.use('/login', loginRouter);
app.use('/auth', authRouter);
app.use('/homepage',sessionFunction, homepageRouter);
app.use('/forgotpassword', forgotpasswordRouter);
app.use('/activateAccount', activateaccRouter);
app.use('/password', passwordRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page'
  console.log(err.message)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
