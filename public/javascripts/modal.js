(function(){

	var app = angular.module('Modal', ['Underlay', 'ModalService']);

	app.directive('modal', ['$document', '$log', '$window', 'modalService', 
        function($document, $log, $window, modalService){

            function getScrollTop(){
                return (window.scrollY || window.pageYOffset);
            }
            function windowHandler(scope) {
                var scrollTop = getScrollTop(),
                    scrollTopValue = scope.scrollTopSnapshot,
                    modalElement = scope.element[0].children[0].children[1],
                    modalHeight = Math.max(
                        modalElement.offsetHeight,
                        modalElement.clientHeight
                    ),
                    viewPortHeight = $window.innerHeight;

                scope.underlayPosition.top = scrollTop + 'px';
                scope.modalPosition.left = ( (window.innerWidth/2)-(619/2)-20 ) + 'px';

                if(scope.isModalVisible == 'true'){
                    if(modalHeight + 50 <= viewPortHeight){
                        scrollTopValue = Math.max(scrollTop, scope.scrollTopSnapshot);
                    } else {
                        if(scope.scrollTopSnapshot + modalHeight + 50 < scrollTop + viewPortHeight){
                            scrollTopValue = ((scrollTop + viewPortHeight) - (modalHeight + 50));
                        } else if(scrollTop < scope.scrollTopSnapshot){
                            scrollTopValue = scrollTop;
                        } else {
                            scrollTopValue = scope.scrollTopSnapshot;
                        }
                        
                    }
                }

                scope.modalPosition.top = (scrollTopValue + 25) + 'px';

            };

		return {
			restrict: 'E',
			templateUrl: '/includes/modal.html',
			transclude: true,

            scope: {
                modalShow: '@ngShow',
                isModalVisible: '@',
                title: '@'
            },

			controller: function($scope, $element){
                $scope.element = $element;
                $scope.modalPosition = {left: '', top: ''};
                $scope.underlayPosition = {top: ''};
                $scope.scrollTopSnapshot = getScrollTop();

				$scope.cancelManager = function(event){
                    $scope.isModalVisible = false;

                    //$scope[$scope.modalShow] = false;
					$scope.$parent[$scope.modalShow] = false;

                    //return false;
				};

                $scope.$watch('isModalVisible', function(newVal, oldVal){
                    modalService.isModalVisible = newVal;
                    $scope.scrollTopSnapshot = getScrollTop();
                    windowHandler($scope);
                });
			},

            link: function(scope, element, attrs){

                var windowEl = angular.element($window);

                windowEl.on('scroll resize', scope.$apply.bind(scope, windowHandler));
                windowHandler(scope);
            },

			controllerAs: 'ModalCtrl'
		};

	}]);
})();