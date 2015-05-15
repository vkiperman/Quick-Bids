(function(){

	var app = angular.module('Marketiqsummary', []);

	app.directive('marketIqSummary', function(){

		return {
			// bindToController: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
				$scope.marketIqSummary = [
					{name: 'Adjusted Market', value: '$8,765'},
					{name: 'Adjusted Retail', value: '$7,654'},
					{name: 'Adjusted Mileage', value: '98,123 miles'},
					{name: 'Distance', value: '200 miles'},
					{name: 'Comp. Set', value: 4},
					{name: 'Recent Sales', value: 3},
					{name: 'Turn Time', value: 33},
					{name: 'Day Supply', value: 40}
				];
			}],
			// controllerAs: 'marketIqSummaryCtrl',
			link: function(scope, element, attrs, marketIqSummaryCtrl, transcludeFn){

			},
			// multiElement: true,
			// name: 'marketiqsummary',
			// priority: 0,
			// replace: true, // [DEPRECATED!]
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check element and its parent, ^^ = check parent, ?^, ?^^
			restrict: 'E', // 'A', 'C', 'M'
			scope: {}, // {} = isolate, true = child, false/undefined = no change, 
				// @ or @attr - bind a local scope property to the value of DOM attribute
				// = or =attr - set up bi-directional binding between a local scope property and the parent scope property
				// =? or =?attr in order to flag the property as optional. 
				// =* or =*attr if you want to shallow watch for changes (i.e. $watchCollection instead of $watch)
				// (=*? or =*?attr if the property is optional).
				// & or &attr - provides a way to execute an expression in the context of the parent scope.
			// template: '<div></div>',
			templateUrl: '/includes/marketiqsummary.html',
			// templateNamespace: 'html', // 'svg' or 'math'
			// terminal: true,
			// transclude: true
		};

	});

})();