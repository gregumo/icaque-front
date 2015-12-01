angular.module('user').controller('ManageController', ['$scope', 'Restangular', function($scope, Restangular) {

        $scope.saving = true;

         var peopleApi = Restangular.all('admins');

        function loadPeople() {
            peopleApi.getList().then(function (people) {
                $scope.people = people;
                console.log(people);
            });
        }

        loadPeople();

        $scope.save = function(user) {
            if($scope.saving) {
                peopleApi.post(user).then(function () {
                    $scope.user = angular.copy($scope.master);
                    loadPeople();
                });
            } else {
                user.put().then(function () {
                    $scope.user = angular.copy($scope.master);
                    loadPeople();
                    $scope.saving = true;
                });
            }
        };

        $scope.reset = function() {
            $scope.user = angular.copy($scope.master);
            $scope.saving = true;
        };

        $scope.remove = function(user) {
            user.remove().then(function() {
                loadPeople();
            });
        };

        $scope.edit = function(user) {
            $scope.user = user;
            $scope.saving = false;
        };

    }]
);
