(function(){

	var app = angular.module('Underlay', []);

	app.directive('underlay', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/underlay.html',

			link: function(scope, element, attrs, obj){
				
			},

			controller: function($scope){
			}
		};

	}]);

})();