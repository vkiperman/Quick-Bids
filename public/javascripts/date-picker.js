(function(){

	var app = angular.module('DatePicker', []);

	app.directive('datePicker', ['$filter', '$document', function($filter, $document){

		return {
			// bindToController: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
				var i = 0;
				$scope.zIndexProp = 1;
				$scope.datesArray = [];
				$scope.calendar = {
					now: new Date(),
					
					displayDate: new Date($scope.originalDate.split('T')[0]),
					displayDateObject: new Date($scope.originalDate.split('T')[0]),
					utilDateObject: new Date($scope.originalDate.split('T')[0]),
					months: [
						{name: 'January'}, 
						{name: 'February'}, 
						{name: 'March'}, 
						{name: 'April'}, 
						{name: 'May'},
						{name: 'June'},
						{name: 'July'},
						{name: 'August'}, 
						{name: 'September'}, 
						{name: 'October'}, 
						{name: 'November'}, 
						{name: 'December'}
					],
					getCurrentMonth: function(){
						return this.displayDateObject.getMonth();
					},
					getCurrentMonthName: function(m){
						return this.months[m || this.displayDateObject.getMonth()].name;
					},
					getCurrentYear: function(m){
						return this.displayDateObject.getFullYear();
					},
					getUtilMonth: function(){
						return this.utilDateObject.getMonth();
					},
					getUtilMonthName: function(m){
						return this.months[m || this.utilDateObject.getMonth()].name;
					},
					getUtilYear: function(m){
						return this.utilDateObject.getFullYear();
					},

					getDatesArray: function(y, m){
						var now = this.getDate(),
							day = 1,
							datesArray = [],
							year = y || this.getUtilYear(),
							month = m || this.getUtilMonth(),
							newDate, size;
						
						while (new Date(year, month, day).getMonth() === month){
							newDate = new Date(year, month, day);
							
							if(datesArray.length === 0){
								datesArray.push([]);
								size = datesArray.length - 1;
								datesArray[size][new Date(year, month, day).getDay() ] = newDate;
							} else {
								size = datesArray.length - 1;
								datesArray[size].push(newDate);
							}

							day++;

							if( datesArray[size].length == 7 ) {
								datesArray.push([]);
							}
						}
						// right-fill last array
						while(datesArray[size].length < 7){
							datesArray[size].push('');
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
					getDate: function(){
						return this.now;
					},
					setDate: function(event, date){
						if(!date) return;
						this.displayDateObject = new Date(date);
					},
					advanceMonth: function(advanceBy){
						var newMonth;
						this.utilDateObject.setMonth(this.utilDateObject.getMonth() + advanceBy);
						newMonth = this.utilDateObject.getMonth();
						this.getDatesArray(this.getUtilYear(), newMonth)
					},
					resetDate: function(){
						this.utilDateObject = new Date(this.displayDateObject);
					}
				};

				$scope.isDatePickerShowing = false;
				$scope.startDatePicker = function(){
					var scope = $scope;
					$scope.calendar.resetDate();
					$scope.calendar.getDatesArray();
					$scope.zIndexProp = 1000;
					$scope.isDatePickerShowing = true;

					setTimeout(function(){
						scope.zIndexProp = 1;
					}, 10);
				};

				$scope.dateControl = $element.find('input')[0];

				$scope.dateControlHeight = $scope.dateControl.clientHeight-1;

				$scope.$watch('calendar.displayDateObject', 
					function (newValue, oldValue) {
						$scope.calendar.displayDate = $filter('date')(newValue, 'MM/dd/yyyy'); 
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
				inputType: '@'
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