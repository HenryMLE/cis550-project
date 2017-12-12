var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('hi')
  // res.sendFile(path.join(__dirname, '../', 'app/views', 'index.html'));
  res.render('index');
  //console.log(path.join(__dirname, '../', 'views', 'index.html'));
});

// router.get('/signin', function(req, res, next) {
//     res.render('signin');
// });

router.get('/signin', require('./signin'));

module.exports = router;
