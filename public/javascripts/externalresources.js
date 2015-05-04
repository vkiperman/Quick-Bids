(function(){

	var app = angular.module('Externalresources', []);

	app.directive('externalResources', function(){

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
			templateUrl: '/includes/externalresources.html',

			link: function(scope/*, element, attrs, transclude*/){

			},

			controller: ['$scope', function($scope){
				$scope.resources = [
					{
						link: 'http://www.carfax.com/',
						linkCaption: 'Update CarFax credentials',
						uri: '/images/carfax.png'
					},
					{
						link: 'https://www.autocheck.com/members/login.do',
						linkCaption: 'Update Autocheck SID',
						uri: '/images/autocheck.png'
					}
				];
			}]
		};

	});

})();