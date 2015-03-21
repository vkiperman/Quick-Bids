(function(){

	angular.module('BidFilters', [])
		.filter('phone', function() {
			return function(input) {
				var segments = [];

				if(!input) return 'Not Provided';

				segments.push(input.substr(0,3));
				segments.push(input.substr(3,3));
				segments.push(input.substr(6));

				return segments.join('-');
			};
		})
		.filter('truncate', function() {
			return function(input, limit) {
				var truncation;
				if(limit >= input.length){
					return input;
				}
				truncation = input.substr(0, limit).replace(/\s$/, '');

				return truncation + '...'

			};
		});

	var app = angular.module('ReportView', ['Modal', 'BidFilters', 'ngTable']);


	app.directive('reportView', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/report-view.html',

			scope: {},

			controller: function($scope, $filter, NgTableParams){

				$scope.pagerTemplate = '/includes/pager.html';

				$scope.offerReportView = [
            		{
		                voucher:'CazKU1',
		                status:'InitAcpt',
		                requestDate: '3/4/15 12:22:55 PM',
		                rebid:'N',
		                images:'3',
		                vin:'1N4AL3AP1DN656255',
		                year:2001,
		                make:'Chevrolet',
		                model:'Silverado 1500 Hybrid',
		                trim:'XL Edition',
		                bodyStyle:'$d utility 4WD',
		                mileage:100020,
		                interiorType:'Cloth',
		                customerReply:'Decline',
		                customerResponseDate:'3/4/15 12:22:55 PM',
		            	customerAmountRequest: 2100,
		                customerComment:'A very long comment left by the customer!',
		            	offer:10000,
		                initialBidDate: '3/4/15 12:22:55 PM',
		                bidder:'smn',
		                bidderComment:'Hello',
		                lastName:'Adams',
		                firstName:'Sammuel',
		                phoneNumber: '6752343123',
		                email: 'myname@email.com',
		                zip:'33130',
		                expiry: '3/4/15 12:22:55 PM'
		            },
            		{
		                voucher:'CAZKW1',
		                status:'InitAcpt',
		                requestDate: '3/3/15 12:02:55 PM',
		                rebid:'Y',
		                images:'13',
		                vin:'1N4AL35JSK9E56255',
		                year:2011,
		                make:'Chevrolet',
		                model:'Silverado 1500 Hybrid',
		                trim:'XL Edition',
		                bodyStyle:'$d utility 4WD',
		                mileage:100020,
		                interiorType:'Cloth',
		                customerReply:'Accept',
		                customerResponseDate:'3/4/15 12:22:55 PM',
		            	customerAmountRequest: 2100,
		                customerComment:'Comment',
		            	offer:11000,
		                initialBidDate: '3/4/15 12:22:55 PM',
		                bidder:'smn',
		                bidderComment:'Hello',
		                lastName:'Smith',
		                firstName:'Sammuel',
		                phoneNumber: '',
		                email: 'myname@email.com',
		                zip:'33160',
		                expiry: '3/4/15 12:22:55 PM'
		            },
            		{
		                voucher:'CAZKU3',
		                status:'InitAcpt',
		                requestDate: '3/3/15 12:02:55 PM',
		                rebid:'Y',
		                images:'32',
		                vin:'1N4AL35JSK9E56255',
		                year:2011,
		                make:'Chevrolet',
		                model:'Silverado 1500 Hybrid',
		                trim:'XL Edition',
		                bodyStyle:'$d utility 4WD',
		                mileage:40020,
		                interiorType:'Cloth',
		                customerReply:'Accept',
		                customerResponseDate:'3/4/14 12:20:55 PM',
		            	customerAmountRequest: 2100,
		                customerComment:'Comment',
		            	offer:11000,
		                initialBidDate: '3/2/15 12:22:43 PM',
		                bidder:'smn',
		                bidderComment:'Hello',
		                lastName:'Henry',
		                firstName:'John',
		                phoneNumber: '',
		                email: 'hj@email.com',
		                zip:'33138',
		                expiry: '3/4/15 12:22:55 PM'
		            }

				];

	            $scope.tableParams = new NgTableParams({
		                page: 1,
		                count: 25,
		                sorting: {
		                    voucher: 'asc'
		                }
		            }, 
		            {
		                total: $scope.offerReportView.length, // length of offerReportViews
		                getData: function($defer, params) {
		                    // use build-in angular filter
		                    var orderedData = params.sorting() ? $filter('orderBy')($scope.offerReportView, params.orderBy()) : $scope.offerReportView;

		                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

		                }
		            }
		        );
			}

		};

	}]);

})();