'use strict';
angular.module('IcaqueApp', []).factory('httpAuthInterceptor', ['$q', '$window', 'SatellizerShared', function($q, $window, shared) {
    return {
        responseError: function(response) {
            if (response.status === 401) {
                shared.logout();
                $window.location.reload();
                $q.reject(response);
            }
        }
    }
}]);