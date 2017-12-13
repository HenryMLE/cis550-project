var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newAccount');
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    console.log('reached browser post!');
    var email = req.body.email;
    var pass = req.body.password;
    database.collection('users').save({
        username: email,
        password: pass,
        recipes: []
    });
    console.log('Saved new user!');
});


module.exports = router;