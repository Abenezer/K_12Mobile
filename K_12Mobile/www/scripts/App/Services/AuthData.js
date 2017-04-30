'use strict';

angular.module('k12App').factory('authData', [function () {
    var authDataFactory = {};

    var _authentication = {
        IsAuthenticated: false,
        userName: ""
    };
    authDataFactory.authenticationData = _authentication;

    return authDataFactory;
}]);