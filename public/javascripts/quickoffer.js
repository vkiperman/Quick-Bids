(function(){
	var QuickOffer = angular.module('QuickOffer', [
		'Tabs',
		'BidForm',
		'MarketIq',
		'Fixscroll',
		'HeaderMenu', 
		'CustomerInfo',
		'GlobalFooter', 
		'BasicHeading',
		'BidInformation',
		'VehicleValuation',
		'VehicleReportCard'
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

	        	ngModel.$validators.validCurrency = function(modelValue, viewValue) {
	        		return !(/[^\d\.]/g.test(modelValue));
	        	};

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
		        	ngModel.$validate();

		        	input.selectionEnd = selectionEnd + (input.value.toString().match(specialsRegExp).length - specials.length);

		        	return showValue = viewValue;
		        });

	        }
		};

	});
	
	QuickOffer.directive('customCase', function(){

		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {customCase: '@'},

			link: function(scope, element, attr, ngModel){
				var input = element[0];

	            ngModel.$formatters.unshift(function (modelValue) {
		        	return (scope.customCase && scope[scope.customCase]) ? scope[scope.customCase](modelValue) : modelValue;
		        });

		        ngModel.$parsers.unshift(function (viewValue) {
		        	var selectionEnd = input.selectionEnd
		        	if(scope.customCase && scope[scope.customCase]){
			        	ngModel.$setViewValue(scope[scope.customCase](viewValue), 'change');
			        	ngModel.$render();
			        }
			        input.selectionEnd = selectionEnd;
		        	return viewValue;
		        });
			},

			controller: function($scope){
				$scope.initialCaps = function initialCaps(rawString){
					return rawString.replace(/(^|\s)./g, function(match, index, orig ){
						return match.toUpperCase();
					});
				};

				$scope.allCaps = function allCaps(rawString){
					return rawString.toUpperCase();
				};
			}
		};
	});

})();