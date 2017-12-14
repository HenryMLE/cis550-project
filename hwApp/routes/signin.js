var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'signin.html'));
});



// router.post('/', function(req, res) {
//   var username = req.body.email;
//   var pass = req.body.password;
//   console.log('the username is: ' + username);
//   console.log('the password is:' + pass);
//   cur = _db.collection('users').find({"username": username, "password": pass});
//   cur.toArray(function(err, docs) {
//       console.log(docs);
//       if (docs.length == 1) {
//           console.log('here2');
//           res.send({"done": true});
//           // res.send(200);
//       }
//       else {
//           // res.send(500);
//       }
//   });
// });


module.exports = router;