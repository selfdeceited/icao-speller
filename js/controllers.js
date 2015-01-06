var STATIC_ID = 0;
var controllers = angular.module('ICAOControllers', []);


/*            ICAOStatsController                */
controllers.controller('ICAOStatsController', ['$scope','$http', function($scope, $http) {
        var SpritzSettings = {
            clientId: "601814952b9e3c346",
            redirectUri: "http://icaoalpha.apphb.com/spritz/login_success.html"
          }

        var alphabet = {};
        $http.get('json/icaoAlphabet.js').success(function(data) {
            alphabet = data;
            $scope.filterData($scope.text)
        });


        $scope.text = "bollocks";

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


        $scope.runSpritz = function(){

          var spritzController = null;


        	var onSpritzifySuccess = function(spritzText) {
        		spritzController.startSpritzing(spritzText);
        	};


        	var onSpritzifyError = function(error) {
        		alert("Unable to Spritz: " + error.message);
        	};


        	function onStartSpritzClick(event) {
        		SpritzClient.spritzify($scope.text, "ru", onSpritzifySuccess, onSpritzifyError)
        	};
        	//var SpritzClient = new SPRITZ.client.SpritzClient(SpritzSettings.clientId, "https://api.spritzinc.com/api-server/v1/" , SpritzSettings.redirectUri);


      		spritzController = new SPRITZ.spritzinc.SpritzerController
      		({placeholderText:{startText:'Click to Spritz'}});

      		spritzController.attach($("#spritzer"));
        }



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

