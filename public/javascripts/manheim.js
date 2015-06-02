(function(){

	var app = angular.module('Manheim', []);

	app.directive('manheim', function(){

		return {
			// bindToController: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {

			}],
			// controllerAs: 'manheimCtrl',
			link: function(scope, element, attrs, manheimCtrl, transcludeFn){

			},
			// multiElement: true,
			// name: 'manheim',
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
			templateUrl: '/includes/manheim.html',
			// templateNamespace: 'html', // 'svg' or 'math'
			// terminal: true,
			// transclude: true
		};

	});

})();