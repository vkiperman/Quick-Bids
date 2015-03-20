(function(){
	var app = angular.module('CurrencyInput', []);

	app.directive('currencyInput', ['$filter', function($filter){

		return {
			restrict: 'E',
        	//require: '?ngModel',
        	template: '<div class="dollar {{className}}">' + 
        			  '<input type="number" min="0" ' +
					  'ng-model="model" /></div>',
			scope: {
				model: 	   '=ngModel',
				ngChange:  '@',
				className: '@class'
			},
			controller: function($scope){
				//ebugger;
				$scope.format = 'currency';
			},
	        link: function (scope, elem, attrs, ctrl) {
		        
	        }
		};

	}]);
})();