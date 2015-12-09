'use strict';
angular.module('user').controller('ListController', function ($mdDialog, $scope, $rootScope, Restangular) {
    $scope.updateList = function() {
        $rootScope.usersApi.getList().then(function(response) {
            $scope.admins = response.data;
        });
    };

    $scope.$on('reloadUserList', function() {
        $scope.updateList();
    });
});
