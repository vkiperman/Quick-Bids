(function(){
	var DashboardContent = angular.module('DashboardContent', []);

	DashboardContent.directive('dashboardContent', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/dashboard-content.html',

			controller: function($scope, $rootScope){
				$scope.dashboard = [
					{
						value: 150,
						type: {title: 'Bid Request', description: '(Pending)'},
						age: 'Oldest 2/25/15 12:35 PM'
					},
					{
						value: 100,
						type: {title: 'Open Bids'},
						age: 'Oldest 2/25/15 12:45 PM'
					},
					{
						value: 10,
						type: {title: 'Counter Offers'},
						age: 'Oldest 2/25/15 12:53 PM'
					},
					{
						value: 15,
						type: {title: 'Expired Bids'},
						age: 'Oldest 2/25/15 12:47 PM'
					},
				]
			},
			controllerAs: 'dashboardContentCtrl'
		}
	});

})();