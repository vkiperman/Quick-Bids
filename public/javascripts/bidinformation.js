(function(){

	var app = angular.module('BidInformation', []);

	app.directive('bidInformation', ['numberFilter', function(numberFilter){

		return {
			restrict: 'E',
			templateUrl: '/includes/bid-information.html',

			scope: {currentTab: '=currentTab'},

			controller: function($scope){

				$scope.vehicleInfo = [
					{
						name: 'Series', value: 'Limited'
					},
					{
						name: 'Body Style', value: '4D Utility'
					},
					{
						name: 'Exterior Color', value: 'Arctic Frost'
					},
					{
						name: 'Interior Type', value: 'Cloth'
					},
					{
						name: 'Interior Color', value: 'Charcoal'
					},
					{
						name: 'VIN', value: '19WWA5641XA011701'
					}
				];
				$scope.conditionSummary = [
					{
						name: 'Damage', value: 'None'
					},
					{
						name: 'Title', value: 'Clear'
					},
					{
						name: 'Smoker', value: 'No'
					},
					{
						name: 'Odometer', value: '46,154'
					},
					{
						name: 'Operable', value: 'Yes'
					},
				];
				$scope.customerInfo = [
					{
						name: 'Name', value: 'Limited'
					},
					{
						name: 'City, State, ZIP', value: 'Chicago, IL, 60505'
					},
					{
						name: 'Email', value: 'myName@gmail.com'
					},
					{
						name: 'Phone', value: '312-245-7879'
					},
					{
						name: 'Need Replacement Vehicle?', value: 'No'
					}
				];

				$scope.setTab = function(currentTab){
					if($scope.currentTab !== currentTab){
						$scope.currentTab = currentTab;
					}
				};

				$scope.isCurrentTab = function(match){
					return $scope.currentTab === match;
				}
			}

		};

	}]);

})();