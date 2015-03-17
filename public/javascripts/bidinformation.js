(function(){

	var app = angular.module('BidInformation', []);

	app.directive('bidInformation', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/bid-information.html',

			controller: function($scope){
				$scope.currentTab = 0;

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

	});

})();