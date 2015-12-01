(function () {
    'use strict';
    angular.module('IcaqueApp').config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('fr', {
            'layout.nav.login': 'Se connecter',
            'layout.nav.register': 'S\'inscrire',
            'layout.nav.user': 'Utilisateurs',

            'userList.heading': 'Utilisateurs',
            'userList.action': 'Actions',
            'userList.action.edit': 'Éditer',
            'userList.search.label': 'Rechercher dans la liste',

            'userDelete.action.delete': 'Supprimer',
            'userDelete.dialog.heading': 'Voulez-vous vraiment supprimer cet utilisateur ?',
            'userDelete.dialog.paragraph': 'Attention cette action est irrémédiable',
            'userDelete.dialog.arialabel': 'Suppression de cet utilisateur',
            'userDelete.dialog.ok': 'Supprimer',
            'userDelete.dialog.cancel': 'Annuler',
            'userDelete.toast.success': 'Utilisateur Supprimé',
            'userDelete.toast.error': 'Utilisateur non supprimé, un problème est survenu',
        });

        $translateProvider.preferredLanguage('fr');
        $translateProvider.useSanitizeValueStrategy('escaped');
    }]);
}());
