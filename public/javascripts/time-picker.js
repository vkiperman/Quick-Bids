(function(){

	var app = angular.module('TimePicker', []);

	app.directive('timePicker', ['$document', function($document){

		return {
			// bindToController: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
				$scope.zIndexProp = 1;
				$scope.isTimePickerShowing = false;
				$scope.hours = [];
				$scope.timeControl = $element.find('input')[0];
				$scope.timeControlWidth = $scope.timeControl.clientWidth + 2; // TODO
				$scope.timeCollectionTop = 0;

				$scope.matchTimeSlot = 0;
				$scope.newIndex = 0;

				$scope.iid = 'timePickerFlyOut_' + $scope.$id;
				$scope.hourItemHeight = 20;
				$scope.hourItemsHeight = 200;

				for(var i = 0; i < 12; i++){
					$scope.hours.push([i+1, '00'].join(':'));
					if($scope.hours[$scope.hours.length - 1] == $scope.originalTime)
						$scope.newIndex = $scope.matchTimeSlot = $scope.hours.length - 1;

					$scope.hours.push([i+1, '30'].join(':'));
					if($scope.hours[$scope.hours.length - 1] == $scope.originalTime)
						$scope.newIndex = $scope.matchTimeSlot = $scope.hours.length - 1;
				}

				$scope.startTimePicker = function(){
					var scope = $scope;
					$scope.zIndexProp = 1000;
					$scope.isTimePickerShowing = true;

					setTimeout(function(){
						scope.zIndexProp = 1;
					}, 10);
				};

				$scope.setTime = function(event, newTime, index){
					$scope.originalTime = newTime;
					$scope.newIndex = index;
				};

				$scope.$watch('isTimePickerShowing', function(newVal, oldVal){
					var scope = $scope,
						inView = $scope.hours.length - (200/$scope.hourItemHeight);
					$scope.timeCollectionTop = 0;
					if($scope.newIndex > inView){
						$scope.timeCollectionTop = -($scope.hourItemHeight * ($scope.newIndex - inView));
					}

					if(document.getElementById($scope.iid)){
						//$scope.hourItemsHeight = Math.max($scope.hourItemsHeight, document.getElementById($scope.iid).getBoundingClientRect().height);
						setTimeout(function(){
							document.getElementById(scope.iid).scrollTop = scope.hourItemHeight * scope.newIndex;
						}, 1);
						
					}
				});			    

			}],
			// controllerAs: 'timePickerCtrl',
			link: function(scope, element, attrs, timePickerCtrl, transcludeFn){
				scope.hideTimePicker = function(event){
			    	if( !scope.isTimePickerShowing ) return;
			    	var target = event.target;

			    	while(target){
			    		if( target === element[0] ) break;
			    		if(target.nodeName.toLowerCase() === 'html'){
			    			scope.isTimePickerShowing = false;
			        		scope.$apply();
			    			break;
			    		}
			    		target = target.parentElement;
			    	}
			        scope.$apply();
			    };

			    $document.bind('mousedown', scope.hideTimePicker);
			    $document.bind('keydown', function(event){
			    	if(!scope.isTimePickerShowing) return;
			    	event.preventDefault();
			    	var moveBy = {
				    		'37': -1,
				    		'38': -1,
				    		'39': 1,
				    		'40': 1
				    	}[event.keyCode] || 0,
			    		newIndex,
			    		currentScrollTop = document.getElementById(scope.iid).scrollTop;

			    	if(event.keyCode == '13'){
			    		scope.isTimePickerShowing = false;
			        	scope.$apply();
			    		return;
			    	}

			    	newIndex = Math.min( scope.hours.length - 1, Math.max(0, scope.newIndex + moveBy) );

			    	if(moveBy){
			    		scope.setTime(event, scope.hours[newIndex], newIndex);
			    		
			    		if(scope.hourItemHeight * scope.newIndex < currentScrollTop ){
			    			document.getElementById(scope.iid).scrollTop = scope.hourItemHeight * scope.newIndex;
			    		}
			    		if(scope.hourItemHeight * scope.newIndex >= currentScrollTop + scope.hourItemsHeight){
			    			document.getElementById(scope.iid).scrollTop = 
			    				(scope.hourItemHeight * (scope.newIndex + 1)) - scope.hourItemsHeight;
			    		}
				    }
				    
			        scope.$apply();
			    });

			},
			// multiElement: true,
			// name: 'time-picker',
			// priority: 0,
			// replace: true, // [DEPRECATED!]
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check element and its parent, ^^ = check parent, ?^, ?^^
			restrict: 'E', // 'A', 'C', 'M'
			scope: {
				inputClass: '@',
				originalTime: '@'
			}, // {} = isolate, true = child, false/undefined = no change, 
				// @ or @attr - bind a local scope property to the value of DOM attribute
				// = or =attr - set up bi-directional binding between a local scope property and the parent scope property
				// =? or =?attr in order to flag the property as optional. 
				// =* or =*attr if you want to shallow watch for changes (i.e. $watchCollection instead of $watch)
				// (=*? or =*?attr if the property is optional).
				// & or &attr - provides a way to execute an expression in the context of the parent scope.
			// template: '<div></div>',
			templateUrl: '/includes/time-picker.html',
			// templateNamespace: 'html', // 'svg' or 'math'
			// terminal: true,
			// transclude: true
		};

	}]);

})();