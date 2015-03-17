(function(){
	var app = angular.module('CustomerInfo', []);

	app.directive('customerInfo', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/customer-info.html',

			scope: {
				heading: '@',
				subheading: '@',
				dealer: '@',
				dealerNumber: '@'
			},
			
			controller: function($scope){

				$scope.title = {
					heading: $scope.heading,
					subheading: $scope.subheading
				};
				
				$scope.customer = {
					dealer: 'Nissan / Mazda of Elk Grove',
					number: '102602'
				};

			}
		}
	});

})()