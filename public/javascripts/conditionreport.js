//condition-report
(function(){
	var app = angular.module('ConditionReport', ['CurrencyInput']);

	app.directive('conditionReport', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/condition-report.html',

			controller: function($scope){
				$scope.totalReconAdjust = 0;
				$scope.totalReconAdjustFrozen = 0;
				$scope.lockReconAdjustment = false;

				$scope.$watch(function(){
						return $scope.$parent.totalReconAdjust;
					}, function(newVal, oldVal){
						$scope.totalReconAdjust = newVal;
				});

				$scope.$watch('totalReconAdjust', function(newVal, oldVal){
					$scope.$parent.totalReconAdjust = newVal;
				});

				$scope.focusManual = function(event){
					$scope.lockReconAdjustment = true;
					document.getElementById('manualInput').focus();
				};

				$scope.aggregate = function(){
					var aggregate = 0;

					angular.forEach($scope.vehicleReportCard, function(e, i){
						angular.forEach(e, function(key){
							aggregate += key.cost || 0;
						});
					});

					if(!$scope.lockReconAdjustment) {
						$scope.totalReconAdjust = aggregate;
					}
					$scope.totalReconAdjustFrozen = aggregate;

				};

				$scope.vehicleReportCard = {
					vehicleHistory: [
						{name:'Status of title', value:'Clear'},
						{name:'Title location', value:'I have the title'},
						{name:'Is your vehicle operable?', value:'Yes'},
						{name:'Has your car been in an accident?', value:'No'},
						{name:'Have after-market parts been added or removed?', value:'No'},
						{name:'Has your car had previous paint or body work done?', value:'No'}
					],
					exterior: [
						{name:'Paint damage', value:'Chips'},
						{name:'Body damage', value:'No'},
						{name:'Glass damage', value:'No'},
						{name:'Lights damage', value:'No'}
					],
					interior: [
						{name:'Seat damage', value:'Chips'},
						{name:'Carpet damage', value:'No'},
						{name:'Odor', value:'No'},
						{name:'Interior damage', value:'No'}
					],
					mechanical: [
						{name:'Engine Issues', value:'Knocks'},
						{name:'Transmission issues', value:'Grinding or Shaking'},
						{name:'Fluid Leaks', value:'Yes'},
						{name:'AC/Heat issues', value:'Weak'},
						{name:'Warning lights on', value:'Yes'},
						{name:'Do you have spare keys?', value:'Yes'}
					],
					tires: [
						{name:'Tires', value:'Recently replaced'},
						{name:'Brakes', value:'Old'}
					]
				}

			}
		};

	}]);
})();