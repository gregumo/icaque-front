angular.module('PocApp')
    .controller('PeopleCtrl', ['$scope', 'Restangular', function($scope, Restangular) {

        var peopleApi = Restangular.all('people');

        function loadPeople() {
            peopleApi.getList().then(function (people) {
                $scope.people = people;
            });
        }

        loadPeople();

        $scope.save = function(user) {
            peopleApi.post(user).then(function () {
                $scope.user = angular.copy($scope.master);
                loadPeople();
            });
        };

        $scope.reset = function() {
            $scope.user = angular.copy($scope.master);
        };

        $scope.remove = function(user) {
            user.remove().then(function() {
                loadPeople();
            });
        };


        /*
        $scope.newPerson = {};
        $scope.success = false;
        $scope.errorTitle = false;
        $scope.errorDescription = false;

        $scope.createPerson = function (form) {
            peopleApi.post($scope.newPerson).then(function () {
                loadPeople();

                $scope.success = true;
                $scope.errorTitle = false;
                $scope.errorDescription = false;

                $scope.newPerson = {};
                form.$setPristine();
            }, function (response) {
                $scope.success = false;
                $scope.errorTitle = response.data['hydra:title'];
                $scope.errorDescription = response.data['hydra:description'];
            });
        };
        */
    }]
);