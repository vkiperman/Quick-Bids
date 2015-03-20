(function(){

	var app = angular.module('BidForm', ['Modal']);

	app.directive('bidForm', function($filter){

		return {
			restrict: 'E',
			templateUrl: '/includes/bid-form.html',

			controller: function($scope){
				$scope.currentBid = 0;
				$scope.totalReconAdjust = 0;

				$scope.showManager = false;
			},

			controllerAs: 'BidFormCtrl'

		};

	});

})();

