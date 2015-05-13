(function(){

	var app = angular.module('Accordion', []);
	
	app.directive('accordion', function() {
		return {
			name: 'accordion',
			restrict: 'E',
			transclude: true,
			scope: {
				displayType: '@'
			},
			controller: ['$scope', function($scope) {
				var contents = $scope.contents = [];

				$scope._directive_name = 'accordion';


				$scope.$on('target.click', function(event, scope){
					$scope.toggle(scope);
				});

				$scope.startUp = function(){
					var firstExpandedPane;
					angular.forEach(contents, function(pane) {
						if(typeof firstExpandedPane !== 'object' && pane.expanded){
							firstExpandedPane = pane;
						}
						pane.expanded = false;
					});

					firstExpandedPane.expanded = true;						
				};

				$scope.toggle = function(pane) {
					if($scope.displayType === 'single'){
						angular.forEach(contents, function(pane) {
							pane.expanded = false;
						});
						pane.expanded = true;
						
						return;
					}

					pane.expanded = !pane.expanded;
				};

				this.push = function(pane) {
					//if (!contents.length) $scope.toggle(pane);
					contents.push(pane);
				};
			}],

			link: function(scope, element, attrs){
				if(scope.displayType === 'single') scope.startUp();
			},

			templateUrl: '/includes/accordion.html'
		};
	});

	app.directive('accordionContent', function() {
		return {
			name: 'accordionContent',
			require: '^accordion',
			restrict: 'E',
			transclude: true,
			replace: true,
			scope: {
				title: '@'
			},
			controller: ['$scope', '$sce', function($scope, $sce){
				$scope._directive_name = 'accordionContent';
				$scope.expanded = false;

				$scope.toggle = function(){
					$scope.$emit('target.click', $scope);
				};
				
				$scope.titleHTML = $sce.trustAsHtml($scope.title);
			}],

			link: function(scope, element, attrs, accordionCtrl) {
				scope.expanded = scope.$eval(attrs.expanded);
				accordionCtrl.push(scope);
			},

			templateUrl: '/includes/accordion-content.html'
		};
	});

})();