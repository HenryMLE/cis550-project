var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require ('mongodb').MongoClient;

var index = require('./routes/index.js');
var recipes = require('./routes/recipes.js');
var signin = require('./routes/signin.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

MongoClient.connect('mongodb://team:FUSIONONFIRE1@ds137826.mlab.com:37826/ritebite', function (err, db) {
  if (err) throw err

  db.collection('users').find().toArray(function(err, result) {
    if(err) throw err

    console.log(result);
  })
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', index);
app.use('/recipes', recipes);
app.use('/signin', signin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname, '../', 'app/views', 'error.html'));
});


app.listen(3000, function () {
  console.log("Express server listening on port 3000");
  });

module.exports = app;
