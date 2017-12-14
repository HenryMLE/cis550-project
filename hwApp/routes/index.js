var express = require('express');
var router = express.Router();
var path = require('path');

var mongo = require('mongodb');
var mongoclient = require('mongodb').MongoClient
var url = "mongodb://team:FUSIONONFIRE1@ds137826.mlab.com:37826/ritebite"
var _db;

mongoclient.connect(url, function(err, db) {
  console.log('Connected to db!');
  _db = db;
});

var mysql = require('mysql');
var connection = mysql.createConnection({
  host : "ritebite.cqyy09trkzju.us-east-1.rds.amazonaws.com",
  user : "sakumar",
  password : "fusiononfire1",
  port: 3306
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});


// ================================== //
// ============ RECIPES ============= //
// ================================== //
router.get('/search/:query', function(req, res, next) {
  cur = _db.collection('recipes').find({"title" : {$regex : ".*"+req.params.query+".*", $options : "i"}})
  cur.toArray(function(err, docs) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(docs);
    }
  });
});

router.get('/recipes', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'recipes.html'));
});

router.get('/recipe/:id', function(req,res) {
    var r_id = new mongo.ObjectID(req.params.id);
    _db.collection('recipes').findOne({"_id": r_id}, function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
          var ingredients = []
          for (var i = 0; i < result.ingredients.length; i++) {
            var obj = result.ingredients[i];
            if (obj.food) {
              ingredients.push("'" + obj.food + "'");
            }
          }

          var query = "SELECT * FROM ritebite.ingredients WHERE shrt_desc IN (" + ingredients.join(',') + ')';
          connection.query(query, function(err, rows, fields) {
            if (err) {
              console.log(err);
            }

            var total = new Object();
            total.protein = 0;
            total.sugar = 0;
            total.fiber = 0;
            total.sodium = 0;
            total.cholesterol = 0;
            total.fat = 0;
            total.carbs = 0;

            for (var i = 0; i < result.ingredients.length; i++) {
              var obj = result.ingredients[i];
              if (obj.food) {
                info = {}
                for (var j = 0; j < rows.length; j++) {
                  if (rows[j].SHRT_DESC === obj.food) {
                    obj.quantity = parseFloat(obj.quantity).toFixed(2);
                    obj.protein = parseFloat(rows[j].PROTEIN_G * obj.quantity).toFixed(2);
                    obj.sugar = parseFloat(rows[j].SUGAR_TOT_G * obj.quantity).toFixed(2);
                    obj.fiber = parseFloat(rows[j].FIBER_TD_G * obj.quantity).toFixed(2);
                    obj.sodium = parseFloat(rows[j].SODIUM_MG * obj.quantity).toFixed(2);
                    obj.cholesterol = parseFloat(rows[j].CHOLESTRL_MG * obj.quantity).toFixed(2);
                    obj.fat = parseFloat(rows[j].FA_SAT_G * obj.quantity).toFixed(2);
                    obj.carbs = parseFloat(rows[j].CARBOHYDRT_G * obj.quantity).toFixed(2);

                    total.protein += parseFloat(obj.protein);
                    total.sugar += parseFloat(obj.sugar);
                    total.fiber += parseFloat(obj.fiber);
                    total.sodium += parseFloat(obj.sodium);
                    total.cholesterol += parseFloat(obj.cholesterol);
                    total.fat += parseFloat(obj.fat);
                    total.carbs += parseFloat(obj.carbs);
                  }
                }
              }
            }

            total.protein = total.protein.toFixed(2);
            total.sugar = total.sugar.toFixed(2);
            total.fiber = total.fiber.toFixed(2);
            total.sodium = total.sodium.toFixed(2);
            total.cholesterol = total.cholesterol.toFixed(2);
            total.fat = total.fat.toFixed(2);

            res.render('../views/recipe.jade', {params: {rec: result, agg: total}});
          });
        }
      });
});

router.get('/addRecipe', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'addRecipe.html'));
});

router.post('/addRecipe', function(req, res, nexxt) {
  var username = req.body.username;
  var title = req.body.title;
  var ingredients = req.body.ingredients;
  var directions = req.body.directions;

  var newRecipe = {title: title, directions: directions, ingredients: ingredients};

  _db.collection('users').findAndModify(
    {username: username}, // query
    [],  // sort order
    { $push: { recipes: newRecipe } }, // replacement, replaces only the field "hi"
    {}, // options
    function(err, object) {
      if (err){
          console.warn(err.message);  // returns error if no matching object found
      }else{
          console.dir(object);
      }
    }
  );
});


// ================================== //
// ========= USER ACCOUNT =========== //
// ================================== //
router.get('/signin', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'signin.html'));
});

router.post('/signin', function(req, res) {
  var username = req.body.email;
  var pass = req.body.password;
  console.log('the username is: ' + username);
  console.log('the password is:' + pass);
  cur = _db.collection('users').find({"username": username, "password": pass});
  cur.toArray(function(err, docs) {
      console.log(docs);
      if (docs.length == 1) {
          console.log('here2');
          res.send({found: true});
          
      }
      else {
          res.send({found: false});
      }
  });
});

router.get('/newAccount', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'newAccount.html'));
});

router.post('/newAccount', function(req, res, next) {
  console.log(req.body);
  console.log('reached browser post!');
  var email = req.body.email;
  var pass = req.body.password;
  database.collection('users').save({
      username: email,
      password: pass,
      recipes: []
  });

  res.sendFile(path.join(__dirname, '../', 'views', 'signin.html'));
});

router.get('/account/:username', function(req, res, next) {
  var username = req.params.username;
  _db.collection('users').findOne({"username": username}, function(err, result) {
    if (err) {
        console.log(err);
    }
    else {
      var name = result.username.split("@")[0];
      res.render('../views/myRecipes.jade', {params: {user: name, recs: result.recipes}});
    }
  });
});













module.exports = router;
