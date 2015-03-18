(function(){
	var app = angular.module('VehicleReportCard', []);

	app.directive('vehicleReportCard', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/vehicle-report-card.html',
		};
	}])
})();