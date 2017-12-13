var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin');
});

router.post('/', function(req, res, next) {
    var username = req.body.email;
    var pass = req.body.password;
    console.log('the username is: ' + username);
    console.log('the password is:' + pass);
    cur = database.collection('users').find({"username":username, "password":pass});
    cur.toArray(function(err, docs) {
        console.log(docs)
        if (docs.length == 1) {
            res.send({"found": true});
        }
        else {
            res.send({"found": false});
        }
    });

});


module.exports = router;