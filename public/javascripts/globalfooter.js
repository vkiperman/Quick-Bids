(function(){
	var app = angular.module('GlobalFooter', []);

	app.directive('globalFooter', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/global-footer.html',

			controller: function($scope){

				$scope.year = new Date().getFullYear();

				$scope.footerLinks = [
					{
						label: 'Logout',
						href: ''
					},
					{
						label: 'Privacy Statement',
						href: 'http://www.cars.com/go/about/privacy.jsp'
					},
					{
						label: 'Terms of Service',
						href: 'http://www.cars.com/go/about/tos.jsp'
					}
				];

			}
		}
	});

})()