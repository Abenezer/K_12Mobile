
angular.module('k12App.version', [
  'k12App.version.interpolate-filter',
  'k12App.version.version-directive'
])

.value('version', '0.1');
