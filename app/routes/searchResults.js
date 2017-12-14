var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:query', function(req, res, next) {
  cur = database.collection('recipes').find({"title" : {$regex : ".*"+req.params.query+".*", $options : "i"}})
  cur.toArray(function(err, docs) {
    console.log(docs)
  });
  res.render('searchResults');
});

module.exports = router;