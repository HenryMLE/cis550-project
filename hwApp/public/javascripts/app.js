var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('myController', function($scope, $http) {
    $scope.message="";
    $scope.Submit = function() {
        var request = $http.get('/data/'+$scope.email);
        request.success(function(data) {
            $scope.data = data;
            console.log(data);
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});

app.controller('recipesController', function($scope, $http) {
    $scope.message="";
    $scope.Submit = function() {
        var request = $http.get('/search/'+$scope.query);
        request.success(function(data) {
            $scope.data = data;
            console.log(data);
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});

// app.controller('signinController', function($scope, $http) {
//     $scope.Submit = function() {
//         var username = req.body.email;
//         var pass = req.body.password;
//         console.log('the username is: ' + username);
//         console.log('the password is:' + pass);
//         cur = database.collection('users').find({"username":username, "password":pass});
//         cur.toArray(function(err, docs) {
//             console.log(docs)
//             if (docs.length == 1) {
//                 res.send({"found": true});
//             }
//             else {
//                 res.send({"found": false});
//             }
//         });
//     };
// });





// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js

app.controller('insertController', function ($scope, $http) {
    $scope.message="";
    $scope.Insert = function() {
        var request = $http.post('/insertrecord', {
            'login':$scope.login,
            'name':$scope.name,
            'sex':$scope.sex,
            'RelationshipStatus':$scope.RelationshipStatus,
            'Birthyear':$scope.Birthyear
        });
        request.success(function(data) {
            console.log('successful insert');
        });
        request.error(function(data){
            console.log('err');
        });
    };
});


// app.controller('recipeController', function($scope, $http) {
//     console.log('in recipeController');
//     console.log($scope);
//     console.log($routeParams.id);

//     // var r_id = req.params.id;
//     // cur = _db.collection('recipes').find({"_id": r_id})
//     // cur.toArray(function(err, rec) {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     //     else {
//     //         res.json(rec[0]);
//     //         console.log(rec[0]);
//     //     }
//     // });
// });