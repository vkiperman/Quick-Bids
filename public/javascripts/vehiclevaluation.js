(function(){

	var app = angular.module('VehicleValuation', ['Marketiqsummary', 'BlackBookValue', 'Manheim']);

	app.directive('vehicleValuation', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/vehicle-valuation.html',

			controller: function($scope){
			}

		};

	});

})();