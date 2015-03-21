(function(){

	var app = angular.module('ReportView', ['Modal']);

	app.directive('reportView', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/report-view.html'

		};

	}]);

})();