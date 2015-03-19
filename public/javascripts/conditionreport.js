//condition-report
(function(){
	var app = angular.module('ConditionReport', []);

	app.directive('conditionReport', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/condition-report.html',

			controller: function($scope){
				$scope.vehicleHistory = [
					{name:'Status of title', value:'Clear'},
					{name:'Title location', value:'I have the title'},
					{name:'Is your vehicle operable?', value:'Yes'},
					{name:'Has your car been in an accident?', value:'No'},
					{name:'Have after-market parts been added or removed?', value:'No'},
					{name:'Has your car had previous paint or body work done?', value:'No'}
				];
				$scope.exterior = [
					{name:'Paint damage', value:'Chips'},
					{name:'Body damage', value:'No'},
					{name:'Glass damage', value:'No'},
					{name:'Lights damage', value:'No'}
				];

			}
		};

	}]);
})();