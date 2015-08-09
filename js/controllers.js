angular.module('ICAOControllers', ['ngSanitize'])
.controller('ICAOStatsController', ['$scope','$http', '$location', function($scope, $http, $location) {
  
        if ($location.search()['text']) {
          $scope.text =  $location.search()['text'];
        } else {
          $http.get('http://api.icndb.com/jokes/random?escape=javascript').
            success(function(data, status, headers, config) {
              $scope.text =  data.value.joke;
            }).
            error(function(data, status, headers, config) {
              $scope.text =  "One morning, when Gregor Samsa woke from troubled dream";
            });
        }
        $scope.lang = "value";
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
      
      var lettersForSymbol = alphabet.filter(function(letter){
        return letter.name === symbol.toUpperCase();
      });
      
      if(lettersForSymbol.length > 0){
        var selectedLetter = lettersForSymbol[0];
        var htmlTemplateToLoad = symbol === " "
            ? '<span>' + selectedLetter[lang] + '</span>'
            : '<span class="tooltip-container"> <span class="tooltip">' + selectedLetter.name  + '</span>' + selectedLetter[lang]  + '</span>';
            
          this.push(htmlTemplateToLoad);
          spelledCorrectly = true;
      }
      
      if (!spelledCorrectly){
        this.push('<span class="symbol-not-found">' + symbol + '</span>');
      }
    }, result);
    return result.join(' ');
  };
});