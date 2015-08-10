angular.module('ICAOControllers', ['ngSanitize'])
.controller('ICAOStatsController', ['$scope','$http', '$location', '$firebaseObject', function($scope, $http, $location, $firebaseObject) {
  
        if ($location.search()['text']) {
          $scope.text =  $location.search()['text'];
        }
        $scope.lang = "value";
        $scope.alphabet = {};
        
        
        var ref = new Firebase("https://torrid-fire-1832.firebaseio.com/");
        // download the data into a local object
        $scope.alphabet = $firebaseObject(ref);
}])

.filter('spell', function() {
  return function(input, lang, alphabet) {
    if(!alphabet || !alphabet["0"]){
      return;
    }
    var result = [];
    angular.forEach(input, function(symbol) {
      var spelledCorrectly = false;
      
        var selectedLetter = alphabet[symbol.toUpperCase()];
        if(!selectedLetter){
          switch(symbol){
            case " ": selectedLetter = alphabet["space"]; break;
            case ".": selectedLetter = alphabet["decimal"]; break;
          }
        }
        
        if(selectedLetter){
        var htmlTemplateToLoad = symbol === " "
            ? '<span>' + selectedLetter[lang] + '</span>'
            : '<span class="tooltip-container tooltip" title="'+ symbol.toUpperCase()+'">' + selectedLetter[lang]  + '</span>';
            
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