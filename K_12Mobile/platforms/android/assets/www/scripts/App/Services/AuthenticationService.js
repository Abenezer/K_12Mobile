(function () {
    'use strict';
    angular.module('k12App')
    .service('AuthenticationService', ['$http', '$q', '$window', 'config',
        function ($http, $q, $window, config) {
            var tokenInfo;

            this.setTokenInfo = function (data) {
                tokenInfo = data;
                $window.sessionStorage["TokenInfo"] = JSON.stringify(tokenInfo);
            }

            this.getTokenInfo = function () {
                return tokenInfo;
            }

            this.removeToken = function () {
                tokenInfo = null;
                $window.sessionStorage["TokenInfo"] = null;
            }

            this.init = function () {
                if ($window.sessionStorage["TokenInfo"]) {
                    tokenInfo = JSON.parse($window.sessionStorage["TokenInfo"]);
                }
            }

            this.setHeader = function (http) {
              
              http.headers = http.headers || {};
              //  delete http.headers.common['X-Requested-With'];
             
                if ((tokenInfo != undefined) && (tokenInfo.accessToken != undefined) && (tokenInfo.accessToken != null) && (tokenInfo.accessToken != "")) {
                    http.headers['Authorization'] = 'Bearer ' + tokenInfo.accessToken;
                    //console.log(tokenInfo.accessToken);
                    http.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                }
              
               
            }
            this.validateRequest = function () {
                var url = config.serviceBase + 'odata/Addresses';
                var deferred = $q.defer();
                $http.get(url).then(function () {
                    deferred.resolve(null);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
            this.init();
        }
    ]);
})();

