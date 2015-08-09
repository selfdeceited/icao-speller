var app = angular.module('ICAOAlphabetApp', [
  'ui.router',
  'ICAOControllers',
  'ngSanitize',
  'firebase'
]);
app.locationSearch = {};

  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
         $urlRouterProvider.otherwise('/spell');
         $stateProvider
          .state('spell', {
              url: '/spell',
              templateUrl: 'partials/list.html',
              controller: 'ICAOStatsController'
          });
    }]);