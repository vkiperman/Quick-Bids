(function(){

	var app = angular.module('DatePicker', []);

	app.directive('datePicker', ['$filter', '$document', function($filter, $document){

		return {
			// bindToController: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			controller: ['$scope', '$element', '$attrs', '$transclude', '$sce', function($scope, $element, $attrs, $transclude, $sce) {
				$scope.flyoutAlignment = $scope.flyoutAlignment || 'left';
				$scope.calendarHeaderFormat = $scope.calendarHeaderFormat || 'MMM, yyyy';
				$scope.zIndexProp = 1;
				$scope.datesArray = [];
				$scope.calendar = {
					now: new Date(),
					
					originalDate: new Date($scope.originalDate.split('T')[0]),
					displayDate: new Date($scope.originalDate.split('T')[0]),
					displayDateObject: new Date($scope.originalDate.split('T')[0]),
					utilDateObject: new Date($scope.originalDate.split('T')[0]),

					getUtilMonth: function(){
						return this.utilDateObject.getMonth();
					},
					getUtilYear: function(m){
						return this.utilDateObject.getFullYear();
					},

					getPrevMonthDates: function(y, m){
						var day = 1,
							datesArray = [],
							year = y || this.getUtilYear(),
							month = m || this.getUtilMonth(),
							firstDay = new Date(year, month, day).getDay();

						for (var i = 1; i <= firstDay; i++){
							datesArray.push(new Date( new Date(year, month, -firstDay+i) ));							
						}

						return datesArray;
					},

					getDatesArray: function(dateObject){
						var day = 1,
							datesArray = [],
							year = (dateObject && dateObject.getFullYear()) || this.getUtilYear(),
							month = (dateObject && dateObject.getMonth()) || this.getUtilMonth(),
							newDate, size,
							WEEK_LENGTH = 7;
						
						while (new Date(year, month, day).getMonth() === month){
							newDate = new Date(year, month, day++);
							
							if(datesArray.length === 0){
								datesArray.push([]);
								size = datesArray.length - 1;

								datesArray[size] = this.getPrevMonthDates(year, month);
								datesArray[size].push(newDate);
							} else {
								size = datesArray.length - 1;
								datesArray[size].push(newDate);
							}

							if( datesArray[size].length == WEEK_LENGTH ) {
								datesArray.push([]);
							}
						}
						// right-fill last array
						while(datesArray[size].length < WEEK_LENGTH){
							datesArray[size].push(new Date(year, month, day++));
						}
						
						$scope.datesArray = datesArray;
						return datesArray;
					},
					isToday: function(date){
						var today = new Date();
						if(!date || typeof date != 'object') return false;

						return today.getFullYear() == date.getFullYear() &&
							today.getMonth() == date.getMonth() &&
							today.getDate() == date.getDate();
					},
					isSelected: function(date){
						return (new Date(this.displayDate).toString() == date);
					},
					/*getDate: function(){
						return this.now;
					},*/
					advanceMonth: function(advanceBy){
						this.utilDateObject.setMonth(this.utilDateObject.getMonth() + advanceBy);
						this.getDatesArray();
					},
					resetDate: function(){
						this.utilDateObject = new Date(this.displayDateObject);
					},
					setDate: function(event, date){
						if(!date) return;
						this.displayDateObject = new Date(date);
					},
					selectToday: function(event){
						this.setDate(event, this.now);
						$scope.startDatePicker();
					},
					gotoToday: function(event){
						$scope.startDatePicker(this.now);
					},
					cancel: function(event){
						this.displayDateObject = this.originalDate;
						$scope.isDatePickerShowing = false;
					}
				};

				$scope.isDatePickerShowing = false;
				$scope.startDatePicker = function(){
					var scope = $scope;
					//$scope.calendar.getPrevMonthDates();
					$scope.calendar.resetDate();
					$scope.calendar.getDatesArray();
					$scope.zIndexProp = 1000;
					$scope.isDatePickerShowing = true;

					setTimeout(function(){
						scope.zIndexProp = 1;
					}, 10);
				};

				$scope.dateControl = $element.find('input')[0];

				$scope.dateControlHeight = $scope.dateControl.offsetHeight-1;

				$scope.$watch('calendar.displayDateObject', 
					function (newValue, oldValue) {
						$scope.calendar.displayDate = $filter('date')(newValue, $scope.displayDateFormat); 
					}
				);
				
			}],
			// controllerAs: 'date-pickerCtrl',
			link: function(scope, element, attrs, datePickerCtrl, transcludeFn){
				var calendar = scope.calendar;

				scope.hideDatePicker = function(event){
			    	var target = event.target;
			    	if( !scope.isDatePickerShowing ) return;

			    	while(target){
			    		if( target === element[0] ) break;
			    		if(target.nodeName.toLowerCase() === 'html'){
			    			scope.isDatePickerShowing = false;
			        		scope.$apply();
			    			break;
			    		}
			    		target = target.parentElement;
			    	}
			        scope.$apply();
			    }
				//calendar.getDatesArray(calendar.now.getFullYear(), calendar.now.getMonth());

			    $document.bind('click', scope.hideDatePicker);
			    $document.bind('keydown', function(event){
			    	var moveBy = {
			    		'37': -1,
			    		'38': -7,
			    		'39': 1,
			    		'40': 7
			    	}[event.keyCode] || 0;

			    	if(!scope.isDatePickerShowing) return;

			    	if(event.keyCode == '13'){
			    		scope.isDatePickerShowing = false;
			    		(document.activeElement).blur();
			    	}

			    	if(moveBy){
			    		calendar.setDate(event, 
			    			calendar.displayDateObject.setDate(calendar.displayDateObject.getDate() + moveBy) );
				        scope.startDatePicker();
				    }
				    
			        scope.$apply();
			    });
			},
			// multiElement: true,
			// name: 'datePicker',
			// priority: 0,
			// replace: true, // [DEPRECATED!]
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check element and its parent, ^^ = check parent, ?^, ?^^
			restrict: 'E', // 'A', 'C', 'M't
			scope: {
				originalDate: '@',
				inputClass: '@',
				inputType: '@',
				displayDateFormat: '@',
				calendarHeaderFormat: '@',
				flyoutAlignment: '@'
			}, // {} = isolate, true = child, false/undefined = no change, 
				// @ or @attr - bind a local scope property to the value of DOM attribute
				// = or =attr - set up bi-directional binding between a local scope property and the parent scope property
				// =? or =?attr in order to flag the property as optional. 
				// =* or =*attr if you want to shallow watch for changes (i.e. $watchCollection instead of $watch)
				// (=*? or =*?attr if the property is optional).
				// & or &attr - provides a way to execute an expression in the context of the parent scope.
			// template: '<div></div>',
			templateUrl: '/includes/date-picker.html',
			// templateNamespace: 'html', // 'svg' or 'math'
			// terminal: true,
			// transclude: true
		};

	}]);

})();