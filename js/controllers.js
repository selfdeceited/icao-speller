var STATIC_ID = 0;
var controllers = angular.module('ICAOControllers', []);


/*            ICAOStatsController                */
controllers.controller('ICAOStatsController', ['$scope','$http', function($scope, $http) {
        $scope.random = Math.random();

        $scope.outputLang = "value";

        $scope.toggleLang = function(lang){
          if(lang){
            $scope.outputLang = lang;
            console.log("Switched to " + lang)
          } else{
            $scope.outputLang = 'value';
          }

        }

        var alphabet = {};
        $http.get('json/icaoAlphabet.js').success(function(data) {
            alphabet = data;
        });

        $scope.filterData = function(data) {
            $scope.alphabet = [];
            //показываем только те буквы алфавита, указанные в data. Их можно дублировать
            for (var i = 0; i < data.length; i++) {
                var currentSymbol = data[i];
                var letterData = findDataForSymbol(alphabet, currentSymbol);
                var newObj = {
                    "name": letterData.name,
                    "value": letterData.value,
                    "russian": letterData.russian,
                    "morse": letterData.morse,
                    "id": STATIC_ID
                };

                STATIC_ID++;
                console.log(newObj.id);

                $scope.alphabet.push(newObj);

            };

        }

        $scope.runSpritz = function(){
            sq=window.sq=window.sq||{};
            if(sq.script){
              sq.again();
            }
            else{
              sq.bookmarkletVersion='0.3.0';
              sq.iframeQueryParams={
                host:'//squirt.io',
                userId:'78410c39-0bc7-450f-99ac-8f65ece0a7ec',
              };
              sq.script=document.createElement('script');
              sq.script.src=sq.iframeQueryParams.host+'/bookmarklet/frame.outer.js';
              document.body.appendChild(sq.script);}
        }

}]);


/*            DetailsController                */
controllers.controller('DetailsController', ['$scope','$routeParams', function($scope, $routeParams) {
    $scope.letterId = $routeParams.letterId;
    $scope.UrlBack = "index.html#/letters";
}]);


function findDataForSymbol (alphabet, currentSymbol){
    for (var i = 0; i < alphabet.length; i++) {
        if(alphabet[i].name === currentSymbol.toUpperCase()){
            return alphabet[i];
        }
    }
    return {"name": currentSymbol, "value": currentSymbol, "russian": currentSymbol};
}

