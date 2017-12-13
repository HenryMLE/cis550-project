var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/account', function(req, res, next) {
    console.log('Reached account router!');
    console.log(req.body);
    var username = req.body.email;
    cur = database.collection('users').find({"username":username});
    cur.toArray(function(err, docs) {
        console.log(docs)
    });
});