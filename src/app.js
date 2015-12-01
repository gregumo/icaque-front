angular.module('IcaqueApp', [
    'ngMaterial',
    'ngRoute',
    'restangular',
    'ui.router',
    'user'
]).config(['RestangularProvider', function (RestangularProvider) {
    var baseRoute = 'app_dev.php/';
    RestangularProvider.setBaseUrl('http://api.icaque.dev/' + baseRoute);

    // JSON-LD @id support
    RestangularProvider.setRestangularFields({
        id: '@id'
    });
    RestangularProvider.setSelfLinkAbsoluteUrl(false);

    // Hydra collections support
    RestangularProvider.addResponseInterceptor(function (data, operation) {
        // Remove trailing slash to make Restangular working
        function populateHref(data) {
            if (data['@id']) {
                data.href = data['@id'].substring(baseRoute.length + 1);
            }
        }

        // Populate href property for the collection
        populateHref(data);

        if ('getList' === operation) {
            var collectionResponse = data['hydra:member'];
            collectionResponse.metadata = {};

            // Put metadata in a property of the collection
            angular.forEach(data, function (value, key) {
                if ('hydra:member' !== key) {
                    collectionResponse.metadata[key] = value;
                }
            });

            // Populate href property for all elements of the collection
            angular.forEach(collectionResponse, function (value) {
                populateHref(value);
            });

            return collectionResponse;
        }

        return data;
    });

    //Remove payLoad from DELETE requests
    RestangularProvider.setRequestInterceptor(function (elem, operation) {
        if (operation === "remove") {
            return null;
        }
        return elem;
    });
}]).controller('AppController', function($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */

    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope, args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function() {
        $mdSidenav(navID)
            .toggle()
            .then(function () {
                $log.debug("toggle " + navID + " is done");
            });
        }, 200);
    }

    function buildToggler(navID) {
        return function() {
        $mdSidenav(navID)
            .toggle()
            .then(function () {
                $log.debug("toggle " + navID + " is done");
            });
        }
    }

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
});
