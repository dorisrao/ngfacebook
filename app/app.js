'use strict';

// Declare app level module which depends on views, and components
angular.module('ngsocial', [
  'ngRoute',
  'ngsocial.view1',
  'ngsocial.view2',
  'ngsocial.facebook'
]).
config(['$routeProvider', function($routeProvider) {
  // $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);

