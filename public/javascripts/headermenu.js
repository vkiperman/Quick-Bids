(function(){
	var app = angular.module('HeaderMenu', []);

	app.directive('headerMenu', function($document){

		return {
			restrict: 'E',
			templateUrl: '/includes/header-menu.html',

			link: function(scope, element, attr){
				
			    $document.bind('click', function(event){
			    	var target = event.target;

			    	while(target && !/mdcDropDownMenu/.test(target.className)){
			    		if(target.nodeName.toLowerCase() === 'html'){			    			
			    			scope.dropDownMenu = '';
			        		scope.$apply();
			    			break;
			    		}
			    		target = target.parentElement;
			    	}
			        scope.$apply();
			    });
			},

			controller: function($scope, $document, $http){

				$scope.navTabs = {};
				$scope.dropDownMenu = '';

				$scope.showDropDownMenu = function(event, menuName){
					if($scope.dropDownMenu === menuName) menuName = '';
					$scope.dropDownMenu = menuName;
				};

				$scope.isDropDownMenu = function(menuName){
					//console.log($scope.dropDownMenu === menuName);
					return $scope.dropDownMenu === menuName;
				};

				$scope.navigateTo = function(uri){location.assign(uri)};

				$http.get('/includes/navigation.json')
					.success(function(data, status, headers, config){
						$scope.navTabs = data;
						//console.log($scope.navTabs);
					})
					.error(function(data, status, headers, config) {})
			}
		}
	});

})();