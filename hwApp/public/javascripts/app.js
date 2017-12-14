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


app.controller('addController', function ($scope, $http) {
    $scope.message="";
    $scope.Add = function() {
        var ings = [];
        var ingSplit = $scope.ingredients.split("\n");
        for (var i = 0; i < ingSplit.length; i++) {
            var parts = ingSplit[i].split(":");
            ings.push({food: parts[0], quantity: parts[1]});
        }

        var request = $http.post('/addRecipe', {
            'username':$scope.username,
            'title':$scope.title,
            'ingredients':ings,
            'directions':$scope.directions
        });
        request.success(function(data) {
            console.log('successful insert');
        });
        request.error(function(data){
            console.log('err');
        });
    };
});