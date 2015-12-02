(function () {
    'use strict';
    angular.module('user', []).config(function ($stateProvider) {
        $stateProvider.state('user-register', {
            url: '/register',
            templateUrl: 'modules/user/register/register.html',
            controller: 'RegisterController'
        })
        .state('user-login', {
            url: '/login',
            templateUrl: 'modules/user/login/login.html',
            controller: 'LoginController'
        })
        .state('user-logout', {
            url: '/logout',
            template: null,
            controller: 'LogoutController'
        })
        .state('user-manage', {
            url: '/manage',
            templateUrl: 'modules/user/manage/manage.html',
            controller: 'ManageController'
        })
        .state('user-reset-password', {
            url: '/reset-password',
            templateUrl: 'modules/user/login/reset-password.html',
            controller: 'ResetPasswordController'
        })
        .state('user-list', {
            url: '/utilisateurs/list',
            templateUrl: 'modules/user/list/list.html',
            controller: 'ListController'
        })
        .state('user-new', {
            url: '/utilisateurs/new',
            templateUrl: 'modules/user/new/new.html',
            controller: 'NewController'
        })
    });
}());
