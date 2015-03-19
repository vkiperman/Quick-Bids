//condition-report
(function(){
	var app = angular.module('ConditionReport', []);

	app.directive('conditionReport', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/condition-report.html',

			controller: function($scope){
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
					]
				}

			}
		};

	}]);
})();