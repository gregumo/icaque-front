'use strict';
angular.module('basket').controller('NewBasketController', ['$rootScope', '$scope', '$filter', function($rootScope, $scope, $filter) {

    $scope.basket = {
        foodBaskets : []
    };

    $scope.foodTypes = [
        $filter('translate')('fruit'),
        $filter('translate')('vegetable')
    ];

    $rootScope.fruitsApi.getList().then(function(response) {
        $scope.fruits = response.data;
    });
    $rootScope.vegetablesApi.getList().then(function(response) {
        $scope.vegetables = response.data;
    });

    $scope.addBasketFood = function() {
        $scope.basket.foodBaskets.push({});
    }
    $scope.removeBasketFood = function(food) {
        var index = $scope.basket.foodBaskets.indexOf(food);
        $scope.basket.foodBaskets.splice(index, 1);
    }
    $scope.throwForm = function() {

        $rootScope.basketsApi.post($scope.basket).then(function(response) {
            $scope.errors = null;
            if(response.status == 200) {
                console.log(response.data);
            }
        })
        .catch(function(response) {
            if (response.data.message.length > 0) {
                toastr.error(response.data.message);
            }
        });
    }
}]);