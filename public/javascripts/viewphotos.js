(function(){

	var app = angular.module('ViewPhotos', []);

	app.directive('viewPhotos', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/view-photos.html',

			link: function(scope, element, attrs, obj){
				
			},

			controller: function($scope){

				$scope.cancelManager = function(event){
					$scope.$parent.cancelManager(event);
				};

				$scope.showImage = function(href){
					window.open(href);
				};
			}
		};

	}]);

})();