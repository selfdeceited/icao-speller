var STATIC_ID = 0;
var controllers = angular.module('ICAOControllers', []);


/*            ICAOStatsController                */
controllers.controller('ICAOStatsController', ['$scope','$http', function($scope, $http) {
        var SpritzSettings = {
            clientId: "601814952b9e3c346",
            redirectUri: "http://icaoalpha.abbhb.com/spritz/login_success.html"
          }

        $scope.spritzIsActivated = false;
        var alphabet = {};
        $http.get('json/icaoAlphabet.js').success(function(data) {
            alphabet = data;
            $scope.filterData($scope.text)
        });


        $scope.text = "One morning, when Gregor Samsa woke from troubled";

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
          if($scope.spritzIsActivated) return;
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


      		spritzController = new SPRITZ.spritzinc.SpritzerController({
      		  placeholderText: {startText:'Let\'s Start!'},
      		  redicleWidth: 600,
      		  redicleHeight: 100,
            controlTitles : {
                play : 	    "Play",
                rewind : 	    "To Beginning",
                back : 	    "Previous",
                forward :     "Next"
            }
      		});


      		spritzController.attach($("#spritzer"));

      		$(".spritzer-control-play").click(function(){
      		  var alphabetData = $scope.alphabet.map(function(value){
      		    return value[$scope.outputLang];

      		  })
      		  alphabetData = alphabetData.join(" ")
      		  alphabetData = alphabetData.replace(/\&nbsp\;/g, " ")
      		                             .replace(/\<b\>/g, "")
        		                           .replace(/\<\/b\>/g,"")
        		                           .replace(/[^a-zа-я0-9 ]/gi,"");

      		  SpritzClient.spritzify(alphabetData.trim(), "ru", onSpritzifySuccess, onSpritzifyError)
      		})

          $scope.spritzIsActivated = true
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

