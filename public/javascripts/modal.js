(function(){

	var app = angular.module('Modal', ['Underlay']);

	app.directive('modal', ['$document', '$log', '$window', function($document, $log, $window){

		return {
			restrict: 'E',
			templateUrl: '/includes/modal.html',
			transclude: true,

            scope: {
                isModalVisible: '@ngShow',
                title: '@'
            },

			controller: function($scope){
                //$scope.isModalVisible = false;
                $scope.modalTop = 0;

				$scope.cancelManager = function(event){
                    $scope[$scope.isModalVisible] = false;
					$scope.$parent[$scope.isModalVisible] = false;

                    return false;
				};
			},

            link: function(scope, element, attrs){

                var windowEl = angular.element($window),
                    scrollHandler = function() {
                        
                        scope.scrollLeft = (window.innerWidth/2)-(619/2)-20;
                        scope.scrollTop = window.scrollY;

                        if(scope.$parent[scope.isModalVisible]) return;
                        scope.modalTop = window.scrollY;


                    };

                windowEl.on('scroll', scope.$apply.bind(scope, scrollHandler));
                scrollHandler();
                
            },

			controllerAs: 'ModalCtrl'
		};

	}]);
})();