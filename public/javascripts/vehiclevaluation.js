(function(){

	var app = angular.module('VehicleValuation', []);

	app.directive('vehicleValuation', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/vehicle-valuation.html'

		};

	});

})();