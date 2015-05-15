(function(){

	var app = angular.module('Conditionsummary', []);

	app.directive('conditionSummary', function(){

		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			//scope: true, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			// template: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			restrict: 'E',
			templateUrl: '/includes/conditionSummary.html',

			link: function(scope/*, element, attrs, ctrl*/){

			},

			controller: function($scope){

				$scope.conditionSummary = [
					{
						name: 'Damage', value: 'None', verify: 'None'
					},
					{
						name: 'Title', value: 'Clear', verify: 'Clear'
					},
					{
						name: 'Smoker', value: 'No', verify: 'Yes'
					},
					{
						name: 'Odometer', value: '46,154', verify: '46,165'
					},
					{
						name: 'Operable', value: 'Yes', verify: 'No'
					},
				];

			}
		};

	});

})();