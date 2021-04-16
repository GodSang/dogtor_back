var express = require('express');
var logger = require('morgan');
var createError = require('http-errors');
var path = require('path');

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/index');
var signUpRouter = require('./routes/signup');
var testRouter = require('./routes/test');

const models = require("./models/index.js");

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("DB 연결 실패");
  console.log(err);
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', authRouter);
app.use('/users', usersRouter);
app.use('/signup', signUpRouter);
app.use('/test', testRouter);

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
