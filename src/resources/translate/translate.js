(function () {
    'use strict';
    angular.module('IcaqueApp').config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('fr', {
            'layout.nav.login': 'Se connecter',
            'layout.nav.register': 'S\'inscrire',
            'layout.nav.user': 'Utilisateurs',
            'layout.nav.logout': 'Déconnexion',
            'layout.nav.basket': 'Paniers',

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

            'userNew.toast.success': 'Utilisateur enregistré',
            'userNew.toast.error': 'l\'utilisateur n\'a pas pu enregistré',
            'userNew.form.name.label': 'Nom',
            'userNew.form.description.label': 'Description',
            'userNew.form.gender.label': 'Genre',
            'userNew.form.gender.option.male': 'Homme',
            'userNew.form.gender.option.female': 'Femme',
            'userNew.form.reset': 'Réinitialiser',
            'userNew.form.submit': 'Valider',

            'user.logout.confirm': 'Vous avez bien été déconnecté',

            'basket.compose.title': 'Composer un panier',

            'basketList.heading': 'Paniers',
            'basketList.action': 'Actions',
            'basketList.action.edit': 'Éditer',
            'basketList.search.label': 'Rechercher dans la liste',

            'basketDelete.action.delete': 'Supprimer',

            'basketNew.form.name.label': 'Nom du panier',
            'basketNew.form.food.quantity.label': 'Quantité',
            'basketNew.form.submit': 'Enregistrer',

            'fruit': 'Fruit',
            'vegetable': 'Légume',
            'basket.compose.select.fruit.label': 'Sélectionnez un fruit',
            'basket.compose.select.vegetable.label': 'Sélectionnez un légume',
        });

        $translateProvider.preferredLanguage('fr');
        $translateProvider.useSanitizeValueStrategy('escaped');
    }]);
}());
