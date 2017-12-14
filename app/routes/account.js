var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:username', function(req, res, next) {
    console.log('Reached account router!');
    console.log(req.params);
    var username = req.params.username;
    cur = database.collection('users').find({"username":username});
    cur.toArray(function(err, docs) {
        console.log(docs)
    });
    res.render('account');
});

module.exports = router;