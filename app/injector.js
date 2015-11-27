angular.module('PocApp', ['ngMaterial', 'ngRoute', 'restangular'])
    .config(['RestangularProvider', function(RestangularProvider) {

        RestangularProvider.setBaseUrl('http://api.icaque.dev/app_dev.php/');

        //Return only members list from getList operation
        RestangularProvider.setResponseExtractor(function(response, operation) {
            if (operation === 'getList') {
                return response['hydra:member'];
            }
            return response;
        });

        //Remove payLoad from DELETE requests
        RestangularProvider.setRequestInterceptor(function(elem, operation) {
            if (operation === "remove") {
                return null;
            }
            return elem;
        });

}]);