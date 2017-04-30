"use strict";
angular.module('k12App.Odata', ['ODataResources'])

 .factory("Parents", ['$odataresource', 'config', function ($odataresource, config) {
     return $odataresource(config.apiUrl + '/Parents', {},
          {
             GetStudent: { method: 'GET', url: config.apiUrl + '/Parents(:pid)/Students' }
          },
         
          {
             odatakey: 'ID',
             isodatav4: true
             

         })
    ;

}])

 .factory("CurrentParent", ['$odataresource', 'config', function ($odataresource, config) {
     return $odataresource(config.apiUrl + '/Parents/Me', {},
           {
              odatakey: 'ID',
              isodatav4: true


          })
     ;

 }])




.factory("CurrentStudents",['$odataresource','config', function ($odataresource,config) {
    return $odataresource(config.apiUrl + '/Parents/MyStudents', {}, {}, {
        odatakey: 'ID',
        isodatav4: true
    })
  

    ;

}])



.factory("Activities", ['$odataresource', 'config', function ($odataresource, config) {
    return $odataresource(config.apiUrl + '/Activities', {}, {}, {
        odatakey: 'ID',
        isodatav4: true
    })


    ;

}])