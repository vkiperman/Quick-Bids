//photos.js
(function(){
	var app = angular.module('Photos', []);

	app.directive('photos', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/photos.html',

			controller: function($scope){
				$scope.image = 0;
				$scope.description = 0;
			}				

		};
		
	}]);

})();
