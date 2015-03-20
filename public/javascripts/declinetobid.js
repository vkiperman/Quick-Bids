(function(){

	var app = angular.module('DeclineToBid', []);

	app.directive('declineToBid', [function(){
		return {
			restrict: 'E',
			templateUrl: '/includes/decline-to-bid.html',
			require: 'ngModel',

			scope:{},

			controller: function($scope){
				$scope.ngAppScope = $scope.$parent.$parent.$parent.vehicleInfo;
				$scope.hasError = false;

				$scope.reasons = [
					{label:'Select', value: 0},
					{label:'Invalid contact information', value: 1},
					{label:'Invalid VIN', value: 2},
					{label:'Heavy damage', value: 3},
					{label:'Salvaged title', value: 4},
					{label:'Mileage discrepency', value: 5},
					{label:'Inoperable', value: 6},
					{label:'Not interested in this vehicle', value: 7}
				];

				$scope.reasonForDeclining = $scope.reasons[0];

				$scope.switchToRequestInfo = function(event){
					$scope.cancelManager(event);
					//     form/   modal/  bidForm
					$scope.$parent.$parent.$parent.showRequestForm = true;
				};

				$scope.submit = function(event) {
					if(!$scope.reasonForDeclining.value){
						return $scope.hasError = true;
					}

					// send data
					// on success close modal:

					$scope.cancelManager(event);
				};

				$scope.cancelManager = function(event){
					$scope.$parent.$parent.cancelManager(event);
				};
			}
		};
	}])

})();