(function(){

	var app = angular.module('VehicleValuation', []);

	app.directive('vehicleValuation', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/vehicle-valuation.html',

			controller: function($scope){
				$scope.bbOptions = false;
				$scope.blackBook = [
					{name: 'X-Clean', value: 'None',  adjust: 'None'},
					{name: 'Clean',   value: 'Clear', adjust: 'Clear'},
					{name: 'Average', value: 'Yes',   adjust: 'Yes'},
					{name: 'Rough',   value: 46154,   adjust: 46000},
				];
				$scope.mmarketIqSummary = [
					{name: 'Adjusted Market', value: '$8,765'},
					{name: 'Adjusted Retail', value: '$7,654'},
					{name: 'Adjusted Mileage', value: '98,123 miles'},
					{name: 'Distance', value: '200 miles'},
					{name: 'Comp. Set', value: 4},
					{name: 'Recent Sales', value: 3},
					{name: 'Turn Time', value: 33},
					{name: 'Day Supply', value: 40}
				];
			}

		};

	});

})();