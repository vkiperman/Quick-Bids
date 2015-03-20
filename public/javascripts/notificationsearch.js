//notificationsearch.js
(function(){
	var app = angular.module('NotificationSearch', []);

	app.directive('notificationSearch', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/notification-search.html',

			controller: function($scope, $animate){
				
				$scope.reports = [					
					{label:'Daily Bid Statistics',value:'a'},
					{label:'Daily Bid Statistics',value:'b'},
					{label:'Daily Bid Statistics',value:'c'}
				];

				$scope.frequencies = [
					{label:'Select Frequency...',value:''},
					{label:'1 hour',value:'1'},
					{label:'2 hour',value:'2'},
					{label:'3 hour',value:'3'},
					{label:'4 hour',value:'1'},
					{label:'5 hour',value:'2'},
					{label:'6 hour',value:'3'}
				];

				$scope.amorpm = [					
					{label:'AM',value:'am'},
					{label:'PM',value:'pm'}				
				];

				$scope.notificationFilter = {
					reportSelected: $scope.reports[0],
					frequencySelected: $scope.frequencies[0],
					ampmSelected: $scope.amorpm[0]					
				};
			},
			controllerAs: 'notificationSearchCtrl'
		}
	});

})()