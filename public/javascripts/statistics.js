//statistics.js
(function(){
	var Statistics = angular.module('Statistics', ['ngTable']);

	Statistics.directive('statistics', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/statistics.html',

			controller: function($scope, $filter, NgTableParams, $location){

				$scope.pagerTemplate = '/includes/pager.html';

				$scope.showReport = function(event){
					
					$scope.reportView = true;
				}

				$scope.regions = [
					{label:'All',value:''},
					{label:'Region A',value:'a'},
					{label:'Region B',value:'b'},
					{label:'Region C',value:'c'}
				];

				$scope.regionFilter = {
					regionSelected: $scope.regions[0],					
					customer: {}
				};

 				$scope.statistics = [
					{
						timeframe: 'Today',
						totalrequests: 100,
						pending: 100,
						bids: 100,
						accepted: 100,
						rejected: 100,
						expired: 100,						
					},
					{
						timeframe: 'Yesterday',
						totalrequests: 100,
						pending: 100,
						bids: 100,
						accepted: 100,
						rejected: 100,
						expired: 100,
					},
					{
						timeframe: 'WTD',
						totalrequests: 100,
						pending: 100,
						bids: 100,
						accepted: 100,
						rejected: 100,
						expired: 100,
					},
					{
						timeframe: 'MTD',
						totalrequests: 100,
						pending: 100,
						bids: 100,
						accepted: 100,
						rejected: 100,
						expired: 100,
					},
					{
						timeframe: 'Last Month',
						totalrequests: 100,
						pending: 100,
						bids: 100,
						accepted: 100,
						rejected: 100,
						expired: 100,
					},
					{
						timeframe: 'YTD',
						totalrequests: 100,
						pending: 100,
						bids: 100,
						accepted: 100,
						rejected: 100,
						expired: 100,
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
		                total: $scope.statistics.length, // length of statisticss
		                getData: function($defer, params) {
		                    // use build-in angular filter
		                    var orderedData = params.sorting() ? $filter('orderBy')($scope.statistics, params.orderBy()) : $scope.statistics;

		                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

		                }
		            }
		        );
			},
			controllerAs: 'statisticsSearchCtrl'
		}
	}]);

})()