var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Reached signin router!");
  res.render('signin');
  // res.sendFile(path.join(__dirname, '../', 'views', 'signin.html'));
});

//router.get('/newAccount', require('./newAccount'));

//console.log("Reached signin router!");
// router.get('/', function(req, res, next) {

// });

module.exports = router;