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
}]);
