'use strict';
angular.module('IcaqueApp').directive('userNew', function ($rootScope, $state, $mdToast, $filter) {
    return {
        restrict: 'E',
        templateUrl: 'components/directives/userNew/userNew.html',
        link: function(scope) {
            scope.save = function(user) {
                $rootScope.usersApi.post(user).then(function () {
                    $state.go('user-list');
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent($filter('translate')('userNew.toast.success'))
                            .hideDelay(3000)
                    );
                }, function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent($filter('translate')('userNew.toast.error'))
                            .hideDelay(3000)
                    );
                });
            };
        }
    };
});
