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

				$scope.getDegrees = function(newVal, oldVal){
					var FC = 360, // full circle
						SC = 180, // semi circle
						QC = 90,  // quarter circle
				    	deg = oldVal || 0,
				    	rotation = deg % FC;
				    newVal = (( newVal * FC ) - QC);
				    if ( rotation < 0 ) { rotation += FC; }
				    if ( rotation < SC && (newVal > (rotation + SC)) ) { deg -= FC; }
				    if ( rotation >= SC && (newVal <= (rotation - SC)) ) { deg += FC; }
				    deg += (newVal - rotation);

					return deg;
				};

				h = new Date(originalTime).getHours();
				m = new Date(originalTime).getMinutes()/60;

				$scope.hourRotationDegrees = $scope.getDegrees((h + m)/12, $scope.hourRotationDegrees);
				$scope.minuteRotationDegrees = $scope.getDegrees(m, $scope.minuteRotationDegrees);

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

				$scope.$watch('hourRotationDegrees', function(newVal, oldVal){
					var transformVal = ( 'rotate(' + newVal + 'deg)' )/*,
						rotIndex = ( $scope.newIndex + 2 ) % 24,
						rgbValue = 136,
						bbc = rgbValue,
						btc = rgbValue,
						blc = rgbValue,
						brc = rgbValue;
					
					if(rotIndex <= 6){
						blc = Math.round(rotIndex/6 * rgbValue);
						bbc = rgbValue - Math.round(rotIndex/6 * rgbValue);
					} else if(rotIndex <= 12){
						bbc = Math.round((rotIndex-6)/6 * rgbValue);
						brc = rgbValue - Math.round((rotIndex-6)/6 * rgbValue);
					} else if(rotIndex <= 18){
						btc = rgbValue - Math.round((rotIndex - 12)/6 * rgbValue);
						brc = Math.round((rotIndex - 12)/6 * rgbValue);
					} else {
						btc = Math.round((rotIndex - 18)/6 * rgbValue);
						blc = rgbValue - Math.round((rotIndex - 18)/6 * rgbValue);
					}*/;
					
					$scope.hourHandStyle = {
						'-webkit-transform': transformVal,
						'-moz-transform': 	 transformVal,
					    '-o-transform': 	 transformVal,
					    '-ms-transform': 	 transformVal,
					    'transform': 		 transformVal/*,
					    'border-bottom-color': 'rgb('+bbc+', '+bbc+', '+bbc+')',
					    'border-top-color': 'rgb('+btc+', '+btc+', '+btc+')',
					    'border-left-color': 'rgb('+blc+', '+blc+', '+blc+')',
					    'border-right-color': 'rgb('+brc+', '+brc+', '+brc+')'*/
					};

				});

				$scope.$watch('minuteRotationDegrees', function(newVal, oldVal){
					var transformVal = ('rotate(' + newVal + 'deg)');
					$scope.minuteHandStyle = {
						'-webkit-transform': transformVal,
						'-moz-transform': 	 transformVal,
					    '-o-transform': 	 transformVal,
					    '-ms-transform': 	 transformVal,
					    'transform': 		 transformVal
					};
				});

				$scope.$watch('originalTime', function(newVal, oldVal){
					var h, m;
					$scope.originalTime = $filter('date')(newVal, $scope.timeFormat);

					if(new Date(newVal) == 'Invalid Date') return;

					h = new Date(newVal).getHours();
					m = new Date(newVal).getMinutes()/60;

					$scope.hourRotationDegrees = $scope.getDegrees((h + m)/12, $scope.hourRotationDegrees);
					$scope.minuteRotationDegrees = $scope.getDegrees(m, $scope.minuteRotationDegrees);
					
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