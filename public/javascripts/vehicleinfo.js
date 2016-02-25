(function(){

	var app = angular.module('Vehicleinfo', []);

	app.directive('vehicleInfo', function(){

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
			templateUrl: '/includes/vehicleinfo.html',

			link: function(scope/*, element, attrs, transclude*/){

			},

			scope: {
                outerClass: '@'
            },

			controller: function($scope){

				$scope.vehicleInfo = [
					{
						name: 'Series', value: 'Limited', verify: 'Wrong'
					},
					{
						name: 'Body Style', value: '4D Utility', verify: '4D Utility'
					},
					{
						name: 'Exterior Color', value: 'Arctic Frost', verify: 'Arctic Frost'
					},
					{
						name: 'Interior Type', value: 'Cloth', verify: 'Cloth'
					},
					{
						name: 'Interior Color', value: 'Charcoal', verify: 'No'
					},
					{
						name: 'VIN', value: '19WWA5641XA011701'
					}
				];
				//$scope.$parent.$parent.$parent.$parent.$parent.vehicleInfo = $scope.vehicleInfo;

			}
		};

	});

})();