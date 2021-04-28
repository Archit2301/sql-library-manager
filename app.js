/*****************************************************
TechDegree Project 8 - SQL Library Manager
*****************************************************/

const Sequelize = require('sequelize');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files setup
app.use("/static", express.static(path.join(__dirname, "public")));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// async IIFE
(async () => {
  try {
    await sequelize.sync({ force: true });

    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 500;
  err.message ='Sorry. This page cannot be found!';
  next(err);
});

// global error handler
app.use(function(err, req, res, next) {
  if ( err.status === 404 ) {
    res.locals.error = err;
    res.render('page-not-found', {title: 'Page Not Found'});
  } else {
    err.status = 500;
    err.message = 'Sorry! There was an unexpected error on the server.';
    res.locals.error = err;
    res.render('error', {title: 'Page Not Found'});
  }
});

module.exports = app;
