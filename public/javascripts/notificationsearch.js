//notificationsearch.js
(function(){
	var app = angular.module('NotificationSearch', ['TimePicker']);

	app.directive('notificationSearch', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/notification-search.html',

			controller: ['$scope', '$animate', function($scope, $animate){
				
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
					ampmSelectedFrom: $scope.amorpm[0],
					ampmSelectedTo: $scope.amorpm[1]					
				};

				$scope.allDays = false;
				$scope.weekdays = [
					{name: 'Sunday', selected: false},
					{name: 'Monday', selected: false},
					{name: 'Tuesday', selected: false},
					{name: 'Wednesday', selected: false},
					{name: 'Thursday', selected: false},
					{name: 'Friday', selected: false},
					{name: 'Saturday', selected: false}
				];
				$scope.selectAllDays = function(all){					
					angular.forEach($scope.weekdays, function(day){
						day.selected = all;
					});
				};
				$scope.changeDay = function(){
					var go = true;
					angular.forEach($scope.weekdays, function(day){
						if(go){
							go = day.selected;
						}
						$scope.allDays = go;
					});
				};

			}],
			controllerAs: 'notificationSearchCtrl'
		}
	});

})();