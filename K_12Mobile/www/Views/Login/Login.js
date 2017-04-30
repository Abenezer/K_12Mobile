angular.module('k12App.login', ['ui.router'])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
   .state('login', {
       url: '/login',
       templateUrl: 'Views/Login/Login.html',
       controller: 'LoginCtrl'
   })

     .state('404', {
         url: '/404',
         templateUrl: 'Views/Login/404.html',
      
     })

}])

.controller('LoginCtrl',['$scope', 'LoginService', '$location', function ($scope, loginService, $location) {  

//    ons.ready(function() {
//  // Onsen UI is now initialized
//  ons.notification.alert('Welcome to Onsen UI!');
//});


 

    $scope.login = function () {
        loginService.login($scope.loginData.userName, $scope.loginData.password).then(function (response) {
          //  console.log(response);
            if (response != null && response.data.error != undefined) {
                //  $scope.message = response.error_description;
                ons.notification.alert(response.data.error_description);
            }
            else if (response != null && response.status == 500)
            {
                ons.notification.alert("Please Check Your Connection");
            }
            else {
                $location.path('/students');
               // ons.notification.alert("OKOK");
            }
        });
    }



    $scope.loginData = {
        username: "",
        password: ""
    };

}]);