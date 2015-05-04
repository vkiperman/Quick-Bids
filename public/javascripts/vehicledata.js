(function(){

	var app = angular.module('Vehicledata', []);

	app.directive('vehicledata', function(){

		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			// template: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			restrict: 'E',
			templateUrl: '/includes/vehicledata.html',

			link: function(scope/*, element, attrs, transclude*/){

			},

			controller: function($scope){

			}
		};

	});

})();