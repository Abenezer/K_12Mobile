angular.module('k12App.students', ['ui.router', 'k12App.Odata', 'SignalR'])

.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
  //  $routeProvider.when('/students', {
    //    templateUrl: 'Views/Students/StudentList.html',
    //    controller: 'StudentListCtrl'
    //});

    //$routeProvider.when('/sections/:sectionID/activities', {
    //    templateUrl: 'Views/Students/StudentActivities.html',
    //    controller: 'StudentActivitiesCtrl'
    //});


    $stateProvider
  .state('students', {
      //url: '/students',\
      url: '/students',
      templateUrl: 'Views/Students/Students.html',
      
  
  })

    .state('students.activities', {

        parent: 'students',
        url: '{sectionID:int}/Activities',
        onEnter: ['$rootScope', function ($rootScope) {
        
            $rootScope.studentNavigator.pushPage('Students/activities.temp');
        }],
        onExit: function($rootScope) {
            $rootScope.studentNavigator.popPage();
    }
    
    })

}])

.controller('StudentListCtrl', ['$scope', '$odataresource', 'AuthenticationService', 'CurrentStudents', function ($scope, $odataresource, authenticationService, CurrentStudents) {
  
 //   authenticationService.validateRequest();
    
    //var sp = Parents.odata()
    //                  .filter("ID", 8)
    //                   .expandPredicate("Students").expand("Student").select("Student")
    //                    .finish().single();
                       
   
   // var sp = Parents.get({}, { 'id': 8 }, {},true);
     
   //  var s = Parents.GetStudent({ 'pid': 8 }).$odata(true).select("FName").query();

   


  //  $scope.students = Students.odata().expandPredicate('Parents').filter('parent_id', 8).finish().query();
  
   // CurrentParent.odata().select('Students').expandPredicate('Students').expand('Student').select('Student').finish().single(function (data) {



    //    $scope.students = data.Students.map(function (s) { return s.Student; });
    //});

    $scope.students = CurrentStudents.odata().query();

}])

.controller('StudentActivitiesCtrl', ['$rootScope','$scope', '$stateParams',  'Activities', 'Hub', 'config', function ($rootScope,$scope, $stateParams, Activities, Hub, config) {
    $scope.message = "hello";
    var hub = new Hub('messageHub', {

        listeners: {
            'hello': function (message) {
                console.log(message);
                $scope.message = message;
                $scope.$apply();
            }
        },
      
        rootPath:  config.serviceBase + "signalr",
        stateChanged: function (state) {
            switch (state.newState) {
                case $.signalR.connectionState.connecting:
                    console.log("connecting");
                    break;
                case $.signalR.connectionState.connected:
                    console.log("connected");
                    break;
                case $.signalR.connectionState.reconnecting:
                    //your code here
                    break;
                case $.signalR.connectionState.disconnected:
                    //your code here
                    break;
            }
        }
    }
        
        );
  
    //hub.connection.hub.start().done(function () {
    //    //sendmessage = function () {
    //    //    chat.server.Hello("it works");
    //    //}

    //    $('#sendbtn').click(function () {
    //        // Call the Send method on the hub. 
    //        chat.server.hello("it works");
    //    });
    //});

    //var chat = $.connection.messageHub;
 
    //// Create a function that the hub can call back to display messages.
    //chat.client.hello = function (message) {
    //    // Add the message to the page. 
    //    console.log(message);
    //};
  
    //$.connection.hub.start().done(function () {
    //    //sendmessage = function () {
    //    //    chat.server.Hello("it works");
    //    //}

    //    $('#sendbtn').click(function () {
    //        // Call the Send method on the hub. 
    //        chat.server.hello("it works");
    //    });
    //});


    //var connection = $.hubConnection("http://localhost:9453/signalr");
    //var proxy = connection.createHubProxy("messageHub");
    //connection.start().done(function () { });

    $scope.activities = Activities.odata().filter('section_id', $stateParams.sectionID).query();

}])


;