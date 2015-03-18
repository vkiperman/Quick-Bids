(function(){
	var app = angular.module('MarketIq', []);

	app.directive('marketIq', [function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/market-iq.html',
		};
	}])
})();