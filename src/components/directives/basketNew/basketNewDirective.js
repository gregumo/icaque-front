'use strict';
angular.module('IcaqueApp').directive('basketNew', function ($rootScope, $state, $mdToast, $filter) {
    return {
        restrict: 'E',
        templateUrl: 'components/directives/basketNew/basketNew.html',
        link: function(scope) {
            scope.save = function(basket) {
                $rootScope.basketsApi.post(basket).then(function () {
                    $state.go('basket-list');
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent($filter('translate')('basketNew.toast.success'))
                            .hideDelay(3000)
                    );
                }, function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent($filter('translate')('basketNew.toast.error'))
                            .hideDelay(3000)
                    );
                });
            };
        }
    };
});
