'use strict';
angular.module('IcaqueApp').directive('userDelete', function ($mdDialog, $mdToast, $filter, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            user: "=",
        },
        link: function(scope, element, attrs) {
            element.bind('click', function(ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    .title($filter('translate')('userDelete.dialog.heading'))
                    .textContent($filter('translate')('userDelete.dialog.paragraph'))
                    .ariaLabel($filter('translate')('userDelete.dialog.arialabel'))
                    .targetEvent(ev)
                    .ok($filter('translate')('userDelete.dialog.ok'))
                    .cancel($filter('translate')('userDelete.dialog.cancel'));

                $mdDialog.show(confirm).then(function() {
                    scope.user.remove().then(function() {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent($filter('translate')('userDelete.toast.success'))
                                .hideDelay(3000)
                        );

                        scope.$emit('reloadUserList');
                    }, function() {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent($filter('translate')('userDelete.toast.error'))
                                .hideDelay(3000)
                        );
                    });


                }, function() {
                    scope.status = 'You decided to keep your debt.';
                });
            });
        }
    };
});
