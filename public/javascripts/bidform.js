(function(){

	var app = angular.module('BidForm', ['Modal', 'RequestAdditionalInformation', 'DeclineToBid']);

	app.directive('bidForm', function($filter){

		return {
			restrict: 'E',
			templateUrl: '/includes/bid-form.html',

			controller: function($scope){
				$scope.currentBid = 0;
				$scope.totalReconAdjust = 0;

				$scope.showRequestForm = false;
				$scope.showRequestDecline = false;
			},

			controllerAs: 'BidFormCtrl'

		};

	});

})();

