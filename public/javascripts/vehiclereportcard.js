(function(){
	var app = angular.module('VehicleReportCard', ['ConditionReport']);

	app.directive('vehicleReportCard', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/vehicle-report-card.html',

			scope: {currentTab: '=currentTab'},

			controller: function($scope){

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
	}])
})();