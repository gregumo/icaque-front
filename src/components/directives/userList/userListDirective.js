'use strict';
angular.module('IcaqueApp').directive('userList', function () {
    return {
        restrict: 'E',
        scope: {
            users: '='
        },
        templateUrl: 'components/directives/userList/userList.html',
    };
});
