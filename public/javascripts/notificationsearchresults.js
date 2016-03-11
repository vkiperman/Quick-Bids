(function(){
	var app = angular.module('NotificationSearchResults', ['ngTable']);

	app.directive('notificationSearchResults', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/notification-search-results.html',

			controller: function($scope, $filter, NgTableParams){

				$scope.pagerTemplate = '/includes/pager.html';

 				$scope.notification = [
					{
						report: 'Daily Bid Statistics',
						method: 'SMS',
						days: 'M, T, W, Th, F, Sa, Su',
						frequency: '1 hour',
						starttime: '9:00 AM',
						endtime: '12:35 PM',
						date: new Date('2/15/2015 12:35 PM'),						
					},
					{
						report: 'Daily Bid Statistics',
						method: 'Email',
						days: 'M, T, W, Th, F, Sa, Su',
						frequency: '1 hour',
						starttime: '9:00 AM',
						endtime: '12:35 PM',
						date: new Date('2/15/2015 12:35 PM'),
					},
					{
						report: 'Daily Bid Statistics',
						method: 'SMS',
						days: 'M, T, W, Th, F, Sa, Su',
						frequency: '1 hour',
						starttime: '9:00 AM',
						endtime: '12:35 PM',
						date: new Date('2/15/2015 12:35 PM'),
					},
					{
						report: 'Daily Bid Statistics',
						method: 'Email',
						days: 'M, T, W, Th, F, Sa, Su',
						frequency: '1 hour',
						starttime: '9:00 AM',
						endtime: '12:35 PM',
						date: new Date('2/15/2015 12:35 PM'),
					}
				];

	            $scope.tableParams = new NgTableParams({
		                page: 1,
		                count: 25,
		                sorting: {
		                    status: 'asc'
		                }
		            }, 
		            {
		            	counts: [],
		                total: 1,//$scope.notification.length, // length of notifications
		                getData: function($defer, params) {
		                    // use build-in angular filter
		                    var orderedData = params.sorting() ? $filter('orderBy')($scope.notification, params.orderBy()) : $scope.notification;

		                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

		                }
		            }
		        );
			},
			controllerAs: 'notificationSearchCtrl'
		}
	});

})();