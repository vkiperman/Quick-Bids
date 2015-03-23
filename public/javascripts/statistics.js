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
						pending: 110,
						bids: 120,
						accepted: 130,
						rejected: 100,
						expired: 140,						
					},
					{
						timeframe: 'Yesterday',
						totalrequests: 100,
						pending: 120,
						bids: 100,
						accepted: 140,
						rejected: 130,
						expired: 100,
					},
					{
						timeframe: 'WTD',
						totalrequests: 100,
						pending: 500,
						bids: 100,
						accepted: 150,
						rejected: 104,
						expired: 100,
					},
					{
						timeframe: 'MTD',
						totalrequests: 100,
						pending: 103,
						bids: 140,
						accepted: 150,
						rejected: 100,
						expired: 150,
					},
					{
						timeframe: 'Last Month',
						totalrequests: 100,
						pending: 100,
						bids: 100,
						accepted: 140,
						rejected: 103,
						expired: 102,
					},
					{
						timeframe: 'YTD',
						totalrequests: 300,
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
		                    totalrequests: 'asc'
		                }
		            }, 
		            {
		                total: $scope.statistics.length, // length of statisticss
		                getData: function($defer, params) {
		                	console.log(params);
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