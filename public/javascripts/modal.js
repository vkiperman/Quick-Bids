(function(){

	var app = angular.module('Modal', []);

	app.directive('modal', [function($document, $log, $window){

		return {
			restrict: 'E',
			templateUrl: '/includes/modal.html',
            scope: {
                scrollTop: '@',
                scrollLeft: '@'
            },

			controller: function($scope){
				$scope.cancelManager = function(event){
                    $scope.showManager = false;
                    return false;
				}
			},

            link: function(scope, element, attrs){
                var windowEl = angular.element($window),
                    scrollHandler = function() {
                        console.log('scrolling');
                        
                        scope.scrollLeft = (window.innerWidth/2)-(619/2)-20;
                        scope.scrollTop = window.scrollY;

                        if(scope.showManager) return;
                        scope.modalTop = window.scrollY;

                    };

                windowEl.on('scroll', scope.$apply.bind(scope, scrollHandler));
                scrollHandler();
                
            },

			controllerAs: 'ModalCtrl'
		};

	}]);
})();