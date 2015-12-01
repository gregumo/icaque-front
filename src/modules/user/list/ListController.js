'use strict';
angular.module('user').controller('ListController', function ($mdDialog, $scope, $rootScope, Restangular) {
    $scope.updateList = function() {
        $rootScope.adminsApi.getList().then(function(data) {
            $scope.admins = data;
            console.log($scope.admins);
        });
    };

    $scope.$on('reloadUserList', function() {
        $scope.updateList();
    });
});
