(function(){

	var app = angular.module('RequestAdditionalInformation', []);

	app.directive('requestAdditionalInformation', [function(){
		return {
			restrict: 'E',
			templateUrl: '/includes/request-additional-information.html',
			require: 'ngModel',

			scope:{},

			controller: function($scope){
				
				$scope.questions = [{value:''}];

				$scope.pictureVehicle = {
					selectAll: false
				};
				$scope.pictureDamage = {
					selectAll: false
				};

				$scope.addQuestion = function(event){
					if($scope.questions.length < 10)
						$scope.questions.push({});
				};
				$scope.removeQuestion = function(event, index){
					$scope.questions.splice(index, 1);
				};

				$scope.cancelManager = function(event){
					$scope.$parent.$parent.cancelManager(event);
				};
			}
		};
	}])

})();