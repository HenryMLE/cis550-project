var express = require('express');
var router = express.Router();
var path = require('path');

var mongoclient = require('mongodb').MongoClient
var url = "mongodb://team:FUSIONONFIRE1@ds137826.mlab.com:37826/ritebite"
var _db; 

mongoclient.connect(url, function(err, db) {
  assert.equal(err, null);
  console.log('Connected to db!');
  _db = db;
});

cur = _db.collection('recipes').find().limit(10);
cur.each(function(err, item) {
  if(item != null) {
    console.log(item);
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('hi')
  // res.sendFile(path.join(__dirname, '../', 'app/views', 'index.html'));
  res.render('index');
  //console.log(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/search/:query', function(req, res, next) {
  cur = _db.collection('recipes').find({"title" : {$regex : ".*"+req.params.query+".*"}})
  cur.toArray(function(err, docs) {
    console.log(docs)
  });
});

// router.get('/signin', function(req, res, next) {
//     res.render('signin');
// });

router.get('/signin', require('./signin'));

module.exports = router;
