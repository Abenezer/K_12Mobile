(function () {  
    'use strict';  
    angular.module('k12App')

    .service('LoginService', ['$http', '$q', 'AuthenticationService', 'authData', 'config',
    function ($http, $q, authenticationService, authData, config) {  
        var userInfo;  
        var loginServiceURL = config.serviceBase + 'oauth/token';
        var deviceInfo = [];  
        var deferred;  
  
        this.login = function (userName, password) {  
            deferred = $q.defer();  
            var data = "grant_type=password&username=" + userName + "&password=" + password;  
            $http.post(loginServiceURL, data, {  
                headers:  
                   { 'Content-Type': 'application/x-www-form-urlencoded' }  
            }).then(function (response) {  
                var o = response.data;
               
                userInfo = {  
                    accessToken: o.access_token,  
                    userName: o.userName  
                };  
                authenticationService.setTokenInfo(userInfo);  
                authData.authenticationData.IsAuthenticated = true;  
                authData.authenticationData.userName = o.userName;  
                deferred.resolve(null);  
            })  
            .catch(function (err, status) {  
                authData.authenticationData.IsAuthenticated = false;
               
                authData.authenticationData.userName = "";  
                deferred.resolve(err);  
            });  
            return deferred.promise;  
        }  
        this.logOut = function () {  
            authenticationService.removeToken();  
            authData.authenticationData.IsAuthenticated = false;  
            authData.authenticationData.userName = "";  
        }  
    }  
    ]);  
})();  