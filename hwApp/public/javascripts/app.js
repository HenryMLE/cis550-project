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

    $http.get( "/ingredients").success(function( data ) {
        $scope.foods = data; //from your sample;
        // alert( "Load was performed. " + data );
    });

    $scope.Add = function() {
        $http.post('/addRecipe', {
            'username':$scope.username,
            'title':$scope.title,
            'ingredients':$scope.ingredients,
            'directions':$scope.directions
        }).success(function(data) {
            console.log('successful insert');
            alert("Recipe successfully added! Please visit your account page to view recipes.");
        });
    };

    $scope.ingredients = []
    $scope.matches = []

    $scope.add = function(food, quantity) {
        $scope.ingredients.push({food: food, quantity: quantity});
    }

    $scope.remove = function(ing) {
        $scope.ingredients.remove(ing)
    }

    $scope.updateMatch = function() {
        console.log("update match called: " + $scope.food);
        $scope.matches = [];
        for(var i = 0; i < $scope.foods.length; i++) {
            if($scope.foods[i].match($scope.food+".*")) {
                if($scope.matches.indexOf($scope.foods[i]) == -1){
                    // console.log($scope.foods[i])
                    $scope.matches.push($scope.foods[i]);
                }
            }
            
        }
        return;
    }
});
