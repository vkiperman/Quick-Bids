(function(){
	var OfferSearch = angular.module('OfferSearchResults', ['ngTable']);

	OfferSearch.directive('offerSearchResults', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/offer-search-results.html',

			controller: function($scope, $filter, NgTableParams){

				$scope.pagerTemplate = '/includes/pager.html';

 				$scope.bids = [
					{
						status: 'Pending',
						date: new Date('2/15/2015 12:35 PM'),
						photo: 32,
						mileage: 50000,
						year: 2015,
						make: 'Mercedes-Benz',
						model: 'AMG SLS Black Series',
						trim: 'GT Final Edition',
                        action: ''
					},
					{
						status: 'Open',
						date: new Date('1/13/2015 12:33 PM'),
						photo: 42,
						mileage: 49000,
						year: 2013,
						make: 'Mercedes-Benz',
						model: 'AMG SLS Black Series',
						trim: 'GT Final Edition',
                        action: 'View/Edit'
					},
					{
						status: 'Countered',
						date: new Date('12/15/2014 12:45 PM'),
						photo: 35,
						mileage: 39000,
						year: 2012,
						make: 'Ford',
						model: 'Explorer',
						trim: 'XL',
                        action: 'View/Edit'
					},
					{
						status: 'Accepted',
						date: new Date('2/15/2015 12:11 PM'),
						photo: 16,
						mileage: 101041,
						year: 2009,
						make: 'Infiniti',
						model: 'Q40',
						trim: 'Sedan',
                        action: 'View/Edit'
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
		                total: $scope.bids.length, // length of bids
		                getData: function($defer, params) {
		                    // use build-in angular filter
		                    var orderedData = params.sorting() ? $filter('orderBy')($scope.bids, params.orderBy()) : $scope.bids;

		                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

		                }
		            }
		        );
			},
			controllerAs: 'offerSearchCtrl'
		}
	});

})()