(function(){

	var app = angular.module('Customerdetail', []);

	app.directive('customerDetail', function(){

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
			templateUrl: '/includes/customerdetail.html',

			link: function(scope/*, element, attrs, transclude*/){

			},

			controller: function($scope){

				$scope.customerInfo = [
					{
						name: 'Name', value: 'Limited'
					},
					{
						name: 'City, State, ZIP', value: 'Chicago, IL, 60505'
					},
					{
						name: 'Email', value: 'myName@gmail.com'
					},
					{
						name: 'Phone', value: '312-245-7879'
					},
					{
						name: 'Need Replacement Vehicle?', value: 'No'
					}
				];

			}
		};

	});

})();