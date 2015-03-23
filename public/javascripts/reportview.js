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

				return truncation + '...';

			};
		})
		.filter('initialCaps', function() {
			return function(input) {
				return [input.charAt(0).toUpperCase(), input.substring(1)].join('');

			};
		});

	var app = angular.module('ReportView', ['Modal', 'EditNote', 'ViewPhotos', 'BidFilters', 'ngTable']);


	app.directive('reportView', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/report-view.html',

			//scope: {},

			link: function(scope, element, attrs, obj){
				
				
			},

			controller: function($scope, $filter, NgTableParams){
				$scope.startScroll = false;
				$scope.endScroll = false;

				$scope.showEditNote = false;
				$scope.showViewPhotos = false;

				$scope.ui = {
					mode: 'edit',
					data: null
				}

				$scope.pagerTemplate = '/includes/pager.html';

				$scope.showModal = function(show, data, mode){
					$scope.ui.mode = mode;
					$scope.ui.data = data;
					$scope[show] = true;
					// pass data model to the form...
				};

				$scope.offerReportView = [
            		{
		                voucher:'CazKU1',
		                status:'InitAcpt',
		                requestDate: '3/4/15 12:22:55 PM',
		                rebid:'N',
		                images:[
		                	{label:'A close up', href:'http://www.rushisaband.com/images/201110/2062.f.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My cool car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My car', href:'https://s-media-cache-ak0.pinimg.com/236x/2e/2e/49/2e2e49bf04231dc6ed6816de324ebf40.jpg'}
		                ],
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
		                expiry: '3/4/15 12:22:55 PM',
		                note: 'Gary Numan may have had a string of hits in the United Kingdom, but “Cars” was his only Top 40 track in the United States. It’s become a new wave staple more than 40 years later, anchored by analog synthesizers, tambourine breakdowns, and Numan’s nearly-emotionless delivery.'
		            },
            		{
		                voucher:'CAZKW1',
		                status:'InitAcpt',
		                requestDate: '3/3/15 12:02:55 PM',
		                rebid:'Y',
		                images:[
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My car', href:'https://s-media-cache-ak0.pinimg.com/236x/2e/2e/49/2e2e49bf04231dc6ed6816de324ebf40.jpg'},
		                	{label:'My car', href:'http://www.rushisaband.com/images/201110/2062.f.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My awesome car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'In the country.', href:'hhttp://www.voyageunbound.com/cars/i/misc/z_1948_ferrari_166_MM_barchetta.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'}
		                ],
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
		                expiry: '3/4/15 12:22:55 PM',
		                note: 'Sure, you could ask The Car’s bassist Benjamin Orr — who supplied lead vocals on the band’s 1984 hit, “Drive” — for a ride, but prepare yourself for an electro-pop filled, melodic onslaught of passive aggressive judgment. The gorgeous, heartfelt ballad known as “Drive” was The Cars’ highest ranking single in the United States and even exhibited a brief comeback two years later when it was featured as background music set to Ethiopian famine images during Live Aid ’85.'
		            },
            		{
		                voucher:'CAZKU3',
		                status:'InitAcpt',
		                requestDate: '3/3/15 12:02:55 PM',
		                rebid:'Y',
		                images:[
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My ride', href:'https://s-media-cache-ak0.pinimg.com/236x/2e/2e/49/2e2e49bf04231dc6ed6816de324ebf40.jpg'},
		                	{label:'My car', href:'http://www.rushisaband.com/images/201110/2062.f.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'Offroad fun...', href:'http://www.voyageunbound.com/cars/i/misc/z_1948_ferrari_166_MM_barchetta.jpg'},
		                	{label:'My car', href:'http://www.rushisaband.com/images/201110/2062.f.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My red car', href:'https://s-media-cache-ak0.pinimg.com/236x/2e/2e/49/2e2e49bf04231dc6ed6816de324ebf40.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'},
		                	{label:'My car', href:'http://s3.amazonaws.com/rapgenius/GdZR162TAemvhEG05Vd7_166_barchettA.jpg'}
		                ],
		                vin:'1N4AL35JSK9E56255',
		                year:2011,
		                make:'Ferrari',
		                model:'Grand tourer',
		                trim:'Front-engine, rear-wheel drive',
		                bodyStyle:'Berlinetta Convertible (Barchetta)',
		                mileage:40020,
		                interiorType:'Leather',
		                customerReply:'Accept',
		                customerResponseDate:'3/4/14 12:20:55 PM',
		            	customerAmountRequest: 2000000,
		                customerComment:'Comment',
		            	offer:1800000,
		                initialBidDate: '3/2/15 12:22:43 PM',
		                bidder:'vkiperman',
		                bidderComment:'Hello',
		                lastName:'Peart',
		                firstName:'Neil',
		                phoneNumber: '',
		                email: 'np@rush.com',
		                zip:'33138',
		                expiry: '3/4/15 12:22:55 PM',
		                note:'I strip away the old debris\nThat hides a shining car\n\nA brilliant red Barchetta\nFrom a better vanished time\n\nI fire up the willing engine\nResponding with a roar\n\nTires spitting gravel\nI commit my weekly crime'
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