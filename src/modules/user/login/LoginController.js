'use strict';
angular.module('user').controller('LoginController', ['$scope', 'Restangular', '$auth', 'toastr', '$location', function($scope, Restangular, $auth, toastr, $location) {
    $scope.throwForm = function() {
        Restangular.one("login_check").customPOST($scope.user).then(function(response) {
            $scope.errors = null;
            if(response.status == 200) {
                console.log(response.data.token);
                $auth.setToken(response.data.token);
                $location.path('/');
            }
        })
        .catch(function(response) {
            if (response.data.message.length > 0) {
                toastr.error(response.data.message);
            }
        });
    }
}]);
