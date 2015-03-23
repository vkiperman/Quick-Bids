(function(){

	var app = angular.module('EditNote', []);

	app.directive('editNote', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/edit-note.html',

			link: function(scope, element, attrs, obj){

			},

			controller: function($scope){

				$scope.cancelManager = function(event){
					$scope.$parent.cancelManager(event);
				};

				$scope.toggleMode = function(mode){
					$scope.ui.mode = mode;
				};
			}
		};

	}]);

})();