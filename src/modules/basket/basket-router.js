(function () {
    'use strict';
    angular.module('basket', []).config(function ($stateProvider) {
        $stateProvider.state('basket-new', {
            url: '/basket/new',
            templateUrl: 'modules/basket/new/new.html',
            controller: 'NewBasketController'
        })
        .state('basket-list', {
            url: '/basket/list',
            templateUrl: 'modules/basket/list/list.html',
            controller: 'ListBasketController'
        })
    });
}());
