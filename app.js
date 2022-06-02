const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyparser = require('body-parser');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');

const pagesRouter = require('./routes/pages');
const config = require('./config.json');

const connect = mongoose.connect(config.mongoUrl, {user: config.mongoUser, pass: String(config.mongoPass)})
connect.then((db) => {
  console.info("Established connection with the database!");
}, (err) => { console.log(err) });

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.set('partials', path.join(__dirname, 'views', 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: err.message + ' | Error' });
});

module.exports = app;
