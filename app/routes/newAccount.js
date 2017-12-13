var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newAccount');
  console.log("Reached newAccount router!");
  // res.sendFile(path.join(__dirname, '../', 'views', 'signin.html'));
});


module.exports = router;