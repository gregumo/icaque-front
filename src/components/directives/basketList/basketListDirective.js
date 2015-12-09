'use strict';
angular.module('IcaqueApp').directive('basketList', function () {
    return {
        restrict: 'E',
        scope: {
            baskets: '='
        },
        templateUrl: 'components/directives/basketList/basketList.html',
    };
});
