(function(){

	var app = angular.module('ViewPhotos', []);

	app.directive('viewPhotos', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/view-photos.html'
		};

	}]);

})();