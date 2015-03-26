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
						title: 'Total Bid Requests Waiting',
						age: 'Oldest 2/25/15 12:35 PM',
                        button: 'Get Next Bid'
					},
					{
						value: 15,
						title: 'Counter Bids',
						age: 'Oldest 2/25/15 12:45 PM',
                        button: 'Get Next Counter Bid'
					},
					{
						value: 10,
						title: 'Active Bids',
						age: 'Oldest 2/25/15 12:53 PM'
					},
					{
						value: 20,
						title: 'Bids Expiring Today'//,
						// age: 'Oldest 2/25/15 12:47 PM'
					},
				]
			},
			controllerAs: 'dashboardContentCtrl'
		}
	});

})();