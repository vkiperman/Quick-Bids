(function(){

	var app = angular.module('Vehicleoptions', []);

	app.directive('vehicleOptions', function(){

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
			templateUrl: '/includes/vehicleoptions.html',

			link: function(scope/*, element, attrs, transclude*/){

			},

			controller: function($scope){
				$scope.vehicleOptions = [
					'New 365-hp Explorer Sport',
					'Turbo four-cylinder',
					'Seats six or seven',
					'Inflatable rear seat belts',
					'Available Terrain Management System',					
					'365-hp, 3.5-liter V-6 (premium)',					
					'6-speed automatic w/OD and auto-manual'
				];
			}
		};

	});

})();