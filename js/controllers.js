var STATIC_ID = 0;
var controllers = angular.module('ICAOControllers', []);


/*            ICAOStatsController                */
controllers.controller('ICAOStatsController', ['$scope','$http', function($scope, $http) {

        var alphabet = {};
        $http.get('json/icaoAlphabet.json').success(function(data) {
            alphabet = setStats(data);
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
                    "imageUrl": letterData.imageUrl,
                    "id": STATIC_ID
                };

                STATIC_ID++;
                console.log(newObj.id);

                $scope.alphabet.push(newObj);
                
            };

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

function setStats(data){
    for(var i in data){
        data[i].imageUrl = "http://placekitten.com/" + getRandomInt(70, 100) + "/" + getRandomInt(25, 50);
    }
    return data;
}


function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
