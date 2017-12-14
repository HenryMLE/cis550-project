var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('recipeController', function($scope, $http) {
  $scope.message="";
  $scope.Submit = function() {
    var query = $http.get('/search/'+$scope.query);
    request.success(function(data) {
        $scope.data = data;
    });
    request.error(function(data){
        console.log('err');
    });
  };
});

// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js

app.controller('insertController', function($scope, $location, $http) {
  $scope.message="";
  $scope.Insert = function() {
      console.log('NAME: ' + $scope.name);
      var params = {
        login: $scope.login,
        name: $scope.name,
        sex: $scope.sex,
        relationshipStatus: $scope.RelationshipStatus,
        birthyear: $scope.Birthyear
      }
      var request = $http.post('/insert/', JSON.stringify(params));
      request.error(function(data){
        console.log('err');
      });
  };
});


app.controller('familyController', function($scope, $location, $http) {
  $scope.message="";

  var request = $http.get('/logins/');
  request.success(function(data) {
    console.log('REQUEST SUCCESS' + data);
    $scope.families = data;
  });

  $scope.Submit = function() {
    console.log('SUBMIT');
    var request = $http.get('/family/' + $scope.family);
    request.success(function(data) {
        $scope.members = data;
    });
    request.error(function(data){
        console.log('err');
    });

  }
})
