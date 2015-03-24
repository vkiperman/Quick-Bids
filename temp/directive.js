(function(){

	var app = angular.module('%MODULENAME%', []);

	app.directive('%DIRECTIVENAME%', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/%TEMPLATENAME%',

			link: function(scope, element, attrs){

			},

			controller: function($scope){

			}
		};

	});

})();