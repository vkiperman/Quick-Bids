(function(){

	var app = angular.module('BidInformation', []);

	app.directive('bidInformation', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/bid-information.html'

		};

	});

})();