(function(){

	var app = angular.module('Tabs', [])
	
	.directive('tabs', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			controller: ['$scope', function($scope) {
				var panes = $scope.panes = [];

				$scope.select = function(pane) {
					angular.forEach(panes, function(pane) {
						pane.selected = false;
					});
					pane.selected = true;
				}

				this.addPane = function(pane) {
					if (!panes.length) $scope.select(pane);
					panes.push(pane);
				}
			}],
			templateUrl: '/includes/tabs.html'
		};
	})

	.directive('pane', function() {
		return {
			require: '^tabs',
			restrict: 'E',
			transclude: true,
			scope: { title: '@' },

			link: function(scope, element, attrs, tabsCtrl) {
				tabsCtrl.addPane(scope);
			},
			templateUrl: '/includes/panes.html'
		};
	});

})();