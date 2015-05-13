(function(){

	var app = angular.module('BidForm', [
		'Modal', 
		'RequestAdditionalInformation', 
		'DeclineToBid'
	]);

	app.directive('bidForm', ['$window', function($window){

		return {
			restrict: 'E',
			templateUrl: '/includes/bid-form.html',
			replace: true,

			controller: function($scope){
				$scope.currentBid = 0;
				$scope.totalReconAdjust = 0;
				$scope.internalNotes = '';
				$scope.showRequestForm = false;
				$scope.showRequestDecline = false;
				$scope.currency = 9876;
				$scope.$on('totalReconAdjustChange', function(event, value){
					$scope.totalReconAdjust = value;
				});
				$scope.$watch('totalReconAdjust', function(newVal, oldVal){
					$scope.$broadcast('totalReconAdjustChange', newVal);
					$scope.$emit('totalReconAdjustChange', newVal);
				});
			},

			link: function(scope, element, attrs, ctrl){
				
			},

			controllerAs: 'BidFormCtrl'

		};

	}]);

})();

