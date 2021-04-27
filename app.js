var express = require('express');
var logger = require('morgan');
var createError = require('http-errors');
var path = require('path');

var authRouter = require('./routes/auth');
var signUpRouter = require('./routes/signup');
var pooRouter = require('./routes/poo');
var peeRouter = require('./routes/pee');
var intakeRouter = require('./routes/intake');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', authRouter); // APP LOGIN 처리
app.use('/signup', signUpRouter); // APP Sign up 처리
app.use('/poo', pooRouter); // 대변 관련 CRUD 처리
app.use('/pee', peeRouter); // 소변 관련 CRUD 처리
app.use('/intake', intakeRouter); // 식사량 관련 CRUD 처리

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
