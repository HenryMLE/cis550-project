var express = require('express');
var router = express.Router();

/* GET recipe search page */
router.get('/', function(req, res, next) {
  res.send('ok')
  // res.sendFile(path.join(__dirname, '../', 'views', 'recipes.html'));
});

/* GET recipe search results */
router.get('/search/:query', function(req, res, next) {
       
});

/* GET specific recipe */ 
router.get('/:name', function(req, res, next) {

});


/* GET create new recipe page */
router.get('/create', function(req, res, next) {

});

/* POST hook for create new recipe */
router.post('/create', function(res, res, next) {

});


module.exports = router;
