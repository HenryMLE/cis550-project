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


// router.get('/reference', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
// });

// router.get('/insert', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'insert.html'));
// });

// router.get('/data/:email', function(req,res) {
//   // use console.log() as print() in case you want to debug, example below:
//   console.log("inside person email");
//   var query = 'SELECT * from Person';
//   // you may change the query during implementation
//   var email = req.params.email;
//   if (email != 'undefined') {
//     query = 'SELECT P.*, count(*) AS num_friends FROM Person P INNER JOIN Friends F on P.login = F.login WHERE P.login="' + email + '" GROUP BY P.login;'
//   } else {
//     query = 'SELECT P.*, count(*) AS num_friends FROM Person P INNER JOIN Friends F on P.login = F.login GROUP BY P.login;'
//   }
//   console.log(query);
//   connection.query(query, function(err, rows, fields) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//         res.json(rows);
//     }  
//     });
// });


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
          console.log(query);
          connection.query(query, function(err, rows, fields) {
            if (err) {
              console.log(err);
            }

            for (var i = 0; i < result.ingredients.length; i++) {
              var obj = result.ingredients[i];
              if (obj.food) {
                ingredients.push("'" + obj.food + "'");
              }
            }

            res.render('../views/recipe.jade', {params: {rec: result}});
            console.log(rows);
          });
        }
      });
});

router.get('/create', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'create.html'));  
});


router.get('/ingredients', function(req, res) {
  var sql = "SELECT shrt_desc FROM ritebite.ingredients;"
  connection.query(sql, function(err, result){
    var names = []
    for(var i = 0; i < result.length; i++) {
      names.push(result[i].shrt_desc)
    }
    res.json(names)
  });
})








// ----Your implemention of route handler for "Insert a new record" should go here-----


router.post('/insertrecord', function(req, res, nexxt) {
  var login = req.body.login;
  var name = req.body.name;
  var sex = req.body.sex;
  var RelationshipStatus = req.body.RelationshipStatus;
  var Birthyear = req.body.Birthyear;

  var query = 'INSERT INTO Person (login, name, sex, relationshipStatus, birthyear) VALUES ("' + login + '", "' + name + '", "' + sex + '", "' + RelationshipStatus + '", "' + Birthyear + '");';
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err);
    }
  });
});



module.exports = router;