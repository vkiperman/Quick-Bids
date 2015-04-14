(function(){

	var app = angular.module('Modal', ['Underlay']);

	app.directive('modal', ['$document', '$log', '$window', function($document, $log, $window){

        var windowHandler = function(scope, b) {
                var scrollTop = (window.scrollY || window.pageYOffset);

                scope.underlayPosition.top = scrollTop + 'px';
                scope.modalPosition.left = ( (window.innerWidth/2)-(619/2)-20 ) + 'px';

                if(scope.$parent[scope.isModalVisible]) return;

                scope.modalPosition.top = (scrollTop + 25) + 'px';

            };

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
                $scope.modalPosition = {left: '', top: ''};
                $scope.underlayPosition = {top: ''};

				$scope.cancelManager = function(event){
                    $scope[$scope.isModalVisible] = false;
					$scope.$parent[$scope.isModalVisible] = false;

                    return false;
				};

                $scope.$watch(function(){
                    return $scope[$scope.isModalVisible];
                }, function(newVal, oldVal){
                    //console.log(newVal, oldVal);
                });
			},

            link: function(scope, element, attrs){

                var windowEl = angular.element($window);

                windowEl.on('scroll', scope.$apply.bind(scope, windowHandler));
                windowEl.on('resize', scope.$apply.bind(scope, windowHandler));
                windowHandler(scope);
                
            },

			controllerAs: 'ModalCtrl'
		};

	}]);
})();