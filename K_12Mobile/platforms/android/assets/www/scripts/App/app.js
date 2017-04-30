// Declare app level module which depends on views, and components





ons.bootstrap('k12App', [
  'ui.router',
  'k12App.login',
  'k12App.students',
  'k12App.version',
  'k12App.Odata'
])

    
.constant('config', {  
    serviceBase : 'http://192.168.137.1:9453/',
    apiUrl: 'http://192.168.137.1:9453/odata',
  })

   
.config(['$locationProvider','$urlRouterProvider', function ($locationProvider, $urlRouterProvider) {
  //  $locationProvider.hashPrefix('!');

    //  $routeProvider.otherwise({ redirectTo: '/sections/22/activities' });
    $urlRouterProvider.otherwise('/students');

}])



 .config(['$httpProvider', function ($httpProvider) {

     $httpProvider.interceptors.push(function ($q, $location, $injector) {

       
         return {
             request: function (config) {
                
                 $injector.get('AuthenticationService').setHeader(config);
               //  console.log(config);
                 return config;
             },
             requestError: function (rejection) {
               
                 return $q.reject(rejection);
             },
             response: function (response) {
                
                 if (response.status == "401") {
                     $location.path('/login');
                 }

                
                
                 //the same response/modified/or a new one need to be returned.  
                 return response;
             },
             responseError: function (rejection) {
                 
                 if (rejection.status == "401") {
                     $location.path('/login');
                 }

                 if (rejection.status == -1) {
                     $location.path('/404');
                 }
                 return $q.reject(rejection);
             }
          };
 })
}]);