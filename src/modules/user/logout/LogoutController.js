'use strict';
angular.module('user').controller('LogoutController', ['$scope', 'Restangular', '$auth', 'toastr', '$location', function($scope, Restangular, $auth, toastr, $location) {
    Restangular.one("logout").customGET().then(function(response) {
        toastr.info('You have been logged out');
        $auth.removeToken();
        $location.path('/');
    });
}]);
