'use strict';
angular.module('basket').controller('ListBasketController', function ($mdDialog, $scope, $rootScope) {
    $scope.updateList = function() {
        $rootScope.basketsApi.getList().then(function(response) {
            $scope.baskets = response.data;
            console.log($scope.baskets);
        });
    };

    $scope.$on('reloadBasketList', function() {
        $scope.updateList();
    });
});
