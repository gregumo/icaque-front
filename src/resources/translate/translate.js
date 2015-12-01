(function () {
    'use strict';
    angular.module('IcaqueApp').config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('fr', {
            'layout.nav.login': 'Se connecter',
            'layout.nav.register': 'S\'inscrire',
            'layout.nav.user': 'Utilisateurs',
        });

        $translateProvider.preferredLanguage('fr');
        $translateProvider.useSanitizeValueStrategy('escaped');
    }]);
}());
