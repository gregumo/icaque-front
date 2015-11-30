'use strict';
angular.module('user').controller('RegisterController', function ($scope) {
    $scope.throwForm = function() {
        console.log('jsflag', $scope.form);
    }
});
