(function(){

	var app = angular.module('BidInformation', [
		'Vehicleinfo',
		'Conditionsummary',
		'Vehicleoptions',
		'Customerdetail',
		'Externalresources'
	]);

	app.directive('bidInformation', ['numberFilter', function(numberFilter){

		return {
			restrict: 'E',
			templateUrl: '/includes/bid-information.html',

			scope: {}, 

			controller: function($scope){
				$scope.heading = 'Bid Information';
				$scope.verified = false;
			}

		};

	}]);

})();