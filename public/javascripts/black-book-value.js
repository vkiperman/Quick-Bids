(function(){

	var app = angular.module('BlackBookValue', []);

	app.directive('blackBookValue', function(){

		return {
			// bindToController: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
				$scope.bbOptions = false;
				$scope.blackBook = [
					{name: 'X-Clean', value: 'None',  adjust: 'None'},
					{name: 'Clean',   value: 'Clear', adjust: 'Clear'},
					{name: 'Average', value: 'Yes',   adjust: 'Yes'},
					{name: 'Rough',   value: 46154,   adjust: 46000},
				];

				$scope.trimValues = [{
					id: 1,
					label: 'Trim selections populated',
					value: 'TrimSelectionsPopulated' 
				}, {
					id: 2,
					label: 'bLabel',
					value: 'bSubItem' 
				}];

				$scope.trimSelected = $scope.trimValues[0].value;// = { name: 'TrimSelectionsPopulated' };

			}],
			// controllerAs: 'blackBookValueCtrl',
			link: function(scope, element, attrs, blackBookValueCtrl, transcludeFn){

			},
			// multiElement: true,
			// name: 'black-book-value',
			// priority: 0,
			// replace: true, // [DEPRECATED!]
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check element and its parent, ^^ = check parent, ?^, ?^^
			restrict: 'E', // 'A', 'C', 'M'
			// scope: {}, // {} = isolate, true = child, false/undefined = no change, 
				// @ or @attr - bind a local scope property to the value of DOM attribute
				// = or =attr - set up bi-directional binding between a local scope property and the parent scope property
				// =? or =?attr in order to flag the property as optional. 
				// =* or =*attr if you want to shallow watch for changes (i.e. $watchCollection instead of $watch)
				// (=*? or =*?attr if the property is optional).
				// & or &attr - provides a way to execute an expression in the context of the parent scope.
			// template: '<div></div>',
			templateUrl: '/includes/black-book-value.html',
			// templateNamespace: 'html', // 'svg' or 'math'
			// terminal: true,
			// transclude: true
		};

	});

})();