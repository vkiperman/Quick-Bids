(function(){

	var app = angular.module('BidForm', ['Modal', 'RequestAdditionalInformation', 'DeclineToBid']);

	app.directive('bidForm', function($filter){

		return {
			restrict: 'E',
			templateUrl: '/includes/bid-form.html',

			controller: function($scope){
				$scope.currentBid = 0;
				$scope.totalReconAdjust = 0;
				$scope.internalNotes = '';

				$scope.showRequestForm = false;
				$scope.showRequestDecline = false;
			},

			controllerAs: 'BidFormCtrl'

		};

	});

	app.directive('special', function(){

		return {
			restrict: 'A',
			require: 'ngModel',
	        link: function(scope, element, attr, ngModel){
	        	var typedVal;

	            ngModel.$formatters.push(function(value){
	            	var words = value.split(' ');
	            	if(!value) return '';
	            	for (var i = 0; i < words.length; i++){
	            		words[i] = words[i][0].toUpperCase() + words[i].substr(1);
	            	}

    				return words.join(' ');
	            });

	            ngModel.$parsers.push(function(value){
	            	ngModel.$setViewValue(value);
					ngModel.$render();
	            	return value;
	            });

	        }
		};

	});

})();

