//condition-report
(function(){
	var app = angular.module('ConditionReport', []);

	app.directive('conditionReport', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/condition-report.html',

			controller: function($scope){

			}
		};

	}]);
})();