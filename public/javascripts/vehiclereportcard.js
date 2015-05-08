(function(){
	var app = angular.module('VehicleReportCard', ['ConditionReport', 'Photos']);

	app.directive('vehicleReportCard', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/vehicle-report-card.html',
		};
	}])
})();