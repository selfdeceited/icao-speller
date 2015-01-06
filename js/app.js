var app = angular.module('ICAOAlphabetApp', [
  'ngRoute',
  'ICAOControllers',
  'ngSanitize'
]);

  app.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
        when('/letters', {
          templateUrl: 'partials/list.html',
          controller: 'ICAOStatsController'
        }).
        when('/letters/:letterId', {
          templateUrl: 'partials/details.html', 
          controller: 'DetailsController'
        }).
        otherwise({
          redirectTo: '/letters'
        });
  }]);