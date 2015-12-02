'use strict';
angular.module('user').controller('RegisterController', ['$scope', 'Restangular', '$auth', 'toastr', '$location', function($scope, Restangular, $auth, toastr, $location) {
    $scope.throwForm = function() {
        var postData = {
            fos_user_registration_form : $scope.user
        };
        postData.fos_user_registration_form.username = $scope.user.email;
        Restangular.one("register").customPOST(postData).then(function(response) {
            $scope.errors = null;
            if(response.status == 200) {
                toastr.info('Votre compte a bien été créé. Un mail contenant un lien de validation vous a été envoyé.');
            } else if(response.status == 201) {
                //$auth.setToken(response.data); //TODO check how to get Token
                toastr.success('Votre compte a bien été créé. Vous êtez maintenant connecté.');
            }
            $location.path('/');
        })
        .catch(function(response) {
            $scope.errors = response.data.fields;
            if (response.data.global.length > 0) {
                toastr.error(response.data.global.join(' '));
            }
        });
    }
}]);
