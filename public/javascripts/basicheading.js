(function(){
	var app = angular.module('BasicHeading', []);

	app.directive('basicHeading', ['$interval', 'dateFilter', function($interval, dateFilter){

		var getFilteredTime = function getFilteredTime(futureTime){
			return dateFilter(( futureTime - new Date().getTime() ), 'mm:ss');
		}

		return {
			restrict: 'E',
			templateUrl: '/includes/basic-heading.html',

			link: function(scope, element, attrs){
				var intervalId;

				function updateTime() {
					if(scope.countDown === '00:00'){
						return $interval.cancel(intervalId);
					}
					scope.countDown = getFilteredTime( scope.futureTime );
				}

				element.on('$destroy', function() {
					$interval.cancel(intervalId);
				});

				intervalId = $interval(function() {
			    	updateTime();
				}, 1000);
			},

			controller: function($scope){
				var now = new Date(),
					duration = 15;
				$scope.futureTime = now.setMinutes(now.getMinutes() + duration);
				$scope.countDown = getFilteredTime( $scope.futureTime );
			}

		};
	}]);

})();