(function(){

	var app = angular.module('BidForm', []);

	app.directive('bidForm', function($filter){

		return {
			restrict: 'E',
			templateUrl: '/includes/bid-form.html',

			controller: function($scope){
				$scope.currentBid = 0;
				$scope.reconAdjustTotal = 0;
			}

		};

	});

})();

