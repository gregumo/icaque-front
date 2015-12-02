'use strict';
angular.module('user').controller('LogoutController', ['$scope', 'Restangular', '$auth', 'toastr', '$location', '$filter', function($scope, Restangular, $auth, toastr, $location, $filter) {
    Restangular.one("logout").customGET().then(function(response) {
        toastr.info($filter('translate')('user.logout.confirm'));
        $auth.removeToken();
        $location.path('/');
    });
}]);
