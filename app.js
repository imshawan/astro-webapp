const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyparser = require('body-parser');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const chalk = require('chalk')

const pagesRouter = require('./routes/pages');
const { timeStamp } = require('./utilities');

const config = require('./config.json');

console.info(timeStamp(), chalk.magentaBright("Starting up the server..."))

const connect = mongoose.connect(config.mongoUrl, {user: config.mongoUser, pass: String(config.mongoPass)})
connect.then(() => {
  console.info(timeStamp(), chalk.yellowBright("Established connection with the database!"));
}, (err) => { throw new Error(err.message) });

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.set('partials', path.join(__dirname, 'views', 'partials'));

app.set('trust proxy', true);
console.info(timeStamp(), chalk.yellowBright("Trust Proxy enabled"))

// Making a custom logging pattern
logger.token("custom", `:timestamp ${chalk.magentaBright(":remote-addr")} - ${chalk.greenBright.bold(":method")} :url ${chalk.yellowBright("HTTP/:http-version")} (:status)`);
logger.token('remote-addr', (req, res) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
})
logger.token('status', (req, res) => {
  if (res.statusCode > 400) return chalk.redBright.bold(res.statusCode)
  else return chalk.greenBright.bold(res.statusCode)
})
logger.token('timestamp', () => {
  return timeStamp()
})
app.use(logger('custom'));
console.info(timeStamp(), chalk.yellowBright("Loggings enabled"))

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
