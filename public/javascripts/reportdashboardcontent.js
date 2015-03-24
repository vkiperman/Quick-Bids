(function(){
	var app = angular.module('ReportDashboardContent', []);

	app.directive('reportDashboardContent', function(){

		return {
			restrict: 'E',
			//templateUrl: '/includes/report-dashboard-content.html',
			templateUrl: '/includes/dashboard-content.html',

			controller: function($scope, $rootScope){
				$scope.dashboard = [
					{
						value: 150,
						title: 'Total Bid Request'
					},
					{
						value: 100,
						title: 'Pending Requests'						
					},
					{
						value: 10,
						title: 'Bids Made'
					},
					{
						value: 20,
						title: 'Accepted Bids'
					},
						{
						value: 20,
						title: 'Rejected Bids'
					},
					{
						value: 20,
						title: 'Expired Bids'
					},	

				]
			},
			controllerAs: 'reportDashboardContentCtrl'
		}
	});

})();