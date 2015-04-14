(function(){
	var QuickOffer = angular.module('QuickOffer', [
		'HeaderMenu', 
		'CustomerInfo', 
		'BasicHeading',
		'BidInformation',
		'VehicleValuation',
		'BidForm',
		'MarketIq',
		'VehicleReportCard',
		'GlobalFooter'
	]);

	QuickOffer.directive('currency', function($filter){

		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {max: '='},
	        link: function(scope, element, attr, ngModel){
	        	var showValue,
		        	input = element[0],
	        		inputMax = scope.max || (1e+6 - .01);

	            ngModel.$formatters.unshift(function toView(modelValue) {
		        	return $filter('currency')(modelValue);
		        });

		        ngModel.$parsers.unshift(function toModel(viewValue) {
		        	var selectionEnd = input.selectionEnd,
		        		specialsRegExp = /[^\d\.]/g,
		        		specials = viewValue.match(specialsRegExp) || [];

		        	viewValue = viewValue.replace(specialsRegExp, '');
		        	viewValue = Math.min(+viewValue, inputMax);

		        	ngModel.$setViewValue($filter('currency')(viewValue), 'change');
		        	ngModel.$render();

		        	input.selectionEnd = selectionEnd + (input.value.toString().match(specialsRegExp).length - specials.length);

					ngModel.$setValidity('hasError', true);
		        	return showValue = viewValue;
		        });

	        }
		};

	});

})();