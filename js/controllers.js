angular.module('ICAOControllers', ['ngSanitize'])
.controller('ICAOStatsController', ['$scope','$http', function($scope, $http) {

        $scope.random = Math.random();
        $scope.text = "One morning, when Gregor Samsa woke from troubled";
        $scope.lang = "value";

        $scope.toggleLang = function(lang){
          if(lang){
            $scope.lang = lang;
          } else{
            $scope.lang = 'value';
          }
        };

        $scope.alphabet = {};
        $http.get('json/icaoAlphabet.js').success(function(data) {
            $scope.alphabet = data;
        });
        
}])

.controller('DetailsController', ['$scope','$routeParams', function($scope, $routeParams) {
    $scope.letterId = $routeParams.letterId;
    $scope.UrlBack = "index.html#/letters";
}])

.filter('spell', function() {
  return function(input, lang, alphabet) {
    var result = [];
    angular.forEach(input, function(symbol) {
      for (var i = 0; i < alphabet.length; i++) {
        if(alphabet[i].name === symbol.toUpperCase()){
            this.push('<span>' + alphabet[i][lang] + '</span>');
        }
    }
    }, result);
    return result.join(' ');
  };
});