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
	        link: function(scope, element, attr, ngModel){


	            ngModel.$formatters.unshift(function(modelValue) {
		        	return $filter('currency')(modelValue);
		        });

		        ngModel.$parsers.unshift(function(viewValue) {
		        	var selectionEnd = element[0].selectionEnd;
		        	viewValue = viewValue.replace(/[^\d\.]/g, '');

		        	ngModel.$setViewValue($filter('currency')(viewValue), 'change');
		        	ngModel.$render();
		        	element[0].selectionEnd = selectionEnd;
		        	console.log(viewValue);
		        	return viewValue;
		        });

	        }
		};

	});

})();