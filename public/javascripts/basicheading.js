(function(){
	var app = angular.module('BasicHeading', []);

	app.directive('basicHeading', ['$interval', 'dateFilter', function($interval, dateFilter){

		return {
			restrict: 'E',
			templateUrl: '/includes/basic-heading.html',

			link: function(scope, element, attrs){
				var intervalId;

				function updateTime() {
					console.log( ( scope.futureTime - new Date().getTime() ) );
					scope.countDown = dateFilter(( scope.futureTime - new Date().getTime() ), 'mm:ss');
				}

				element.on('$destroy', function() {
					$interval.cancel(intervalId);
				});

				intervalId = $interval(function() {
			    	updateTime();
				}, 999);
			},

			controller: function($scope){
				var now = new Date();
				$scope.futureTime = now.setMinutes(now.getMinutes() + 15);
				$scope.countDown = '15:00';
			}

		};
	}]);

})();