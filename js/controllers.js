angular.module('ICAOControllers', ['ngSanitize'])
.controller('ICAOStatsController', ['$scope','$http', function($scope, $http) {
        $http.get('http://api.icndb.com/jokes/random').
          success(function(data, status, headers, config) {
            $scope.text =  data.value.joke;
          }).
          error(function(data, status, headers, config) {
            $scope.text =  "One morning, when Gregor Samsa woke from troubled dream";
          });
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

.filter('spell', function() {
  return function(input, lang, alphabet) {
    var result = [];
    angular.forEach(input, function(symbol) {
      var spelledCorrectly = false;
      for (var i = 0; i < alphabet.length; i++) {
        if(alphabet[i].name === symbol.toUpperCase()){
            this.push('<span>' + alphabet[i][lang] + '</span>');
            spelledCorrectly = true;
        }
    }
    if(!spelledCorrectly){
      this.push('<span>' + symbol + '</span>');
    }
    }, result);
    return result.join(' ');
  };
});