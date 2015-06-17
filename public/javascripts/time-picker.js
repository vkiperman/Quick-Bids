(function(){

	var app = angular.module('TimePicker', []);

	app.filter('sin', function() {
		return function(input) {
			return Math.sin(input);
		};
	});
	app.filter('cos', function() {
		return function(input) {
			return Math.cos(input);
		};
	});

	app.directive('timePicker', ['$filter', '$document', function($filter, $document){

		return {
			// bindToController: true,
			//compile: function(tElement, tAttrs){},
			controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
				var originalTime = new Date(), h, m;
				originalTime = new Date(originalTime.setHours($scope.originalTime.split(':')[0]));
				originalTime = new Date(originalTime.setMinutes($scope.originalTime.split(':')[1]));
				
				$scope.displayFormat = $scope.displayFormat || 'default';
				$scope.PI = Math.PI;
				$scope.originalTime = originalTime;
				$scope.timeFormat = $scope.timeFormat || 'h:mm';

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

				$scope.timePickerFlyOutStyle = {top: 0, 'z-index': 1, width: ($scope.timeControlWidth) + 'px'};
				$scope.clockFlyoutStyle = {top: 0, 'z-index': 1};

				$scope.hourOrigin = '0 4px';
				$scope.minuteOrigin = '0 3px';

				$scope.getDegrees = function(n){
					return (( n * 360 ) - 90) + 'deg'
				};

				h = new Date(originalTime).getHours();
				m = new Date(originalTime).getMinutes()/60;

				$scope.hourRotationDegrees = $scope.getDegrees((h + m)/12);
				$scope.minuteRotationDegrees = $scope.getDegrees(m);
				$scope.hourHandStyle = {
					'-webkit-transform': 'rotate('+$scope.hourRotationDegrees+')',
					'-moz-transform': 'rotate('+$scope.hourRotationDegrees+')',
				    '-o-transform': 'rotate('+$scope.hourRotationDegrees+')',
				    '-ms-transform': 'rotate('+$scope.hourRotationDegrees+')',
				    'transform': 'rotate('+$scope.hourRotationDegrees+')'
				};
				$scope.minuteHandStyle = {
					'-webkit-transform': 'rotate('+$scope.minuteRotationDegrees+')',
					'-moz-transform': 'rotate('+$scope.minuteRotationDegrees+')',
				    '-o-transform': 'rotate('+$scope.minuteRotationDegrees+')',
				    '-ms-transform': 'rotate('+$scope.minuteRotationDegrees+')',
				    'transform': 'rotate('+$scope.minuteRotationDegrees+')'
				};

				for(var i = 0, time, time30; i < 12; i++){
					time = new Date();
					time = new Date(time.setHours(i+1));

					$scope.hours.push(new Date(time.setMinutes(0)));
					if($scope.hours[$scope.hours.length - 1].toString() == $scope.originalTime.toString())
						$scope.newIndex = $scope.matchTimeSlot = $scope.hours.length - 1;

					$scope.hours.push(new Date(time.setMinutes(30)));
					if($scope.hours[$scope.hours.length - 1].toString() == $scope.originalTime.toString())
						$scope.newIndex = $scope.matchTimeSlot = $scope.hours.length - 1;
				}

				$scope.startTimePicker = function(){
					var scope = $scope;
					$scope.timePickerFlyOutStyle['z-index'] = 1000;
					$scope.clockFlyoutStyle['z-index'] = 1000;
					$scope.isTimePickerShowing = true;

					setTimeout(function(){
						scope.timePickerFlyOutStyle['z-index'] = 1;
						scope.clockFlyoutStyle['z-index'] = 1;
					}, 10);

				};

				$scope.setTime = function(event, newTime, index){
					$scope.originalTime = newTime;
					$scope.newIndex = index;
				};

				$scope.isHour = function(time){
					return ( $filter('date')(time, $scope.timeFormat) == $scope.originalTime );
				}

				$scope.$watch('originalTime', function(newVal, oldVal){
					var h, m;
					$scope.originalTime = $filter('date')(newVal, $scope.timeFormat);

					if(new Date(newVal) == 'Invalid Date') return;

					h = new Date(newVal).getHours();
					m = new Date(newVal).getMinutes()/60;

					$scope.hourRotationDegrees = $scope.getDegrees((h + m)/12);
					$scope.minuteRotationDegrees = $scope.getDegrees(m);
					$scope.hourHandStyle = {
						'-webkit-transform': 'rotate('+$scope.hourRotationDegrees+')',
						'-moz-transform': 'rotate('+$scope.hourRotationDegrees+')',
					    '-o-transform': 'rotate('+$scope.hourRotationDegrees+')',
					    '-ms-transform': 'rotate('+$scope.hourRotationDegrees+')',
					    'transform': 'rotate('+$scope.hourRotationDegrees+')'
					};
					$scope.minuteHandStyle = {
						'-webkit-transform': 'rotate('+$scope.minuteRotationDegrees+')',
						'-moz-transform': 'rotate('+$scope.minuteRotationDegrees+')',
					    '-o-transform': 'rotate('+$scope.minuteRotationDegrees+')',
					    '-ms-transform': 'rotate('+$scope.minuteRotationDegrees+')',
					    'transform': 'rotate('+$scope.minuteRotationDegrees+')'
					};
				});

				$scope.$watch('isTimePickerShowing', function(newVal, oldVal){
					var scope = $scope,
						inView = $scope.hours.length - (200/$scope.hourItemHeight),
						inputTop = $scope.timeControl.getBoundingClientRect().top,
						clockBoxHeight = 304;

					$scope.timePickerFlyOutStyle.top = 0;

					if($scope.newIndex > inView){
						$scope.timePickerFlyOutStyle.top = -($scope.hourItemHeight * ($scope.newIndex - inView)) + 'px';
					}

					if(inputTop + clockBoxHeight > window.innerHeight){
						$scope.clockFlyoutStyle.top = -(inputTop + clockBoxHeight - window.innerHeight) + 'px';
					} else {
						$scope.clockFlyoutStyle.top = ($scope.timeControl.getBoundingClientRect().height - 1) + 'px';
					}

					if(document.getElementById($scope.iid)){
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
			        (document.activeElement).blur();
			    };

			    $document.bind('mousedown', scope.hideTimePicker);
			    $document.bind('keydown', function(event){
			    	if(!scope.isTimePickerShowing) return;
			    	if(event.keyCode != 9){
				    	event.preventDefault();
				    }

			    	var moveBy = {
				    		'37': -1,
				    		'38': scope.displayFormat == 'default' ? -1 : 1,
				    		'39': 1,
				    		'40': scope.displayFormat == 'default' ? 1 : -1
				    	}[event.keyCode] || 0,
			    		newIndex,
			    		currentScrollTop = document.getElementById(scope.iid).scrollTop;

			    	switch(event.keyCode){
			    		case 13:
			    			(document.activeElement).blur();
			    		case 9:
			    			scope.isTimePickerShowing = false;
			    			break;
			    	}

			    	//newIndex = Math.min( scope.hours.length - 1, Math.max(0, scope.newIndex + moveBy) );
			    	newIndex = (scope.newIndex + moveBy) % 24;
			    	if(newIndex < 0) {
			    		newIndex = 23;
			    	}

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
				originalTime: '@',
				timeFormat: '@',
				displayFormat: '@'
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