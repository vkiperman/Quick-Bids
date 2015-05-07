(function(){

	var app = angular.module('BidForm', ['Modal', 'RequestAdditionalInformation', 'DeclineToBid']);

	app.directive('bidForm', ['$filter', '$window', function($filter, $window){

		function getStyle(element, strCssRule){
			var strValue = '';
			if(document.defaultView && document.defaultView.getComputedStyle){
				strValue = document.defaultView.getComputedStyle(element, '').getPropertyValue(strCssRule);
			} else if(element.currentStyle){
				strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
					return p1.toUpperCase();
				});
				strValue = element.currentStyle[strCssRule];
			}
			return strValue;
		}

		function getScroll(){
			var supportPageOffset = window.pageXOffset !== undefined,
				isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"),
				docElement = isCSS1Compat ? document.documentElement : document.body;

			return {
				x: supportPageOffset ? window.pageXOffset : docElement.scrollLeft,
				y: supportPageOffset ? window.pageYOffset : docElement.scrollTop
			};
		}

		return {
			restrict: 'E',
			templateUrl: '/includes/bid-form.html',

			controller: function($scope){
				$scope.currentBid = 0;
				$scope.totalReconAdjust = 0;
				$scope.internalNotes = '';

				$scope.showRequestForm = false;
				$scope.showRequestDecline = false;

				$scope.currency = 9876;

				$scope.scrollPhase = 1;
			},

			scope: {fixScroll: '@'},

			replace: true,

			link: function(scope, element, attrs, ctrl){
                var windowEl = angular.element($window),
                	elementWidth = element[0].offsetWidth,
                	originalTop = element[0].getBoundingClientRect().top,
                	parentElement = element.parent().parent(),
                	formContainer = element.find('div').eq(0),
                	OFFSET_TOP = 20,
                	PARENT_OFFSET_TOP = parseInt(getStyle(parentElement[0], 'padding-top')),
                	top,
                	height,
            		parentTop,
            		parentBottom,
                	parentHeight,
                	boxHeight,

                	setPosition = function(positionValue, topValue, classAction){
                		element.css({
                			position: positionValue,
                			top: topValue + 'px'
                		});
                		formContainer[classAction]('boxShadow');
                	},
                	phaseWatcher = function(newValue, oldValue) {
						var params = [
							['static', 0, 'removeClass'],
							['fixed', OFFSET_TOP, 'addClass'],
							['absolute', parentHeight - height, 'removeClass']
						];

						setPosition.apply(null, params[newValue-1]);
				    };

				scope.$watch('scrollPhase', phaseWatcher);

                element.css({width: elementWidth + 'px'});
                parentElement.css({position: 'relative'});

                if(scope.fixScroll){

	                windowEl.on('scroll', scope.$apply.bind(scope, function(){
	                	var elementRect = element[0].getBoundingClientRect(),
	                		parentRect = parentElement[0].getBoundingClientRect();

	                	top = elementRect.top;
		                height = elementRect.height;
	                	parentTop = parentRect.top;
	                	parentBottom = parentRect.bottom;
		                parentHeight = parentRect.height;
		                boxHeight = height + 
		                		parseInt(getStyle(element[0], 'padding-top')) +
	                			parseInt(getStyle(element[0], 'padding-bottom')) +  
		                		parseInt(getStyle(element[0], 'border-top-width')) +
		                		parseInt(getStyle(element[0], 'border-bottom-width')) +
	                			parseInt(getStyle(element[0], 'margin-top')) +
	                			parseInt(getStyle(element[0], 'margin-bottom'));

	                	// this works in all browsers
	                	if(parentBottom < Math.round(boxHeight) + OFFSET_TOP){
	                		scope.scrollPhase = 3;

	                	} else if(parentTop <= PARENT_OFFSET_TOP){
	                		scope.scrollPhase = 2;

	                	} else {
	                		scope.scrollPhase = 1;

	                	}

	                }));
				}
			},

			controllerAs: 'BidFormCtrl'

		};

	}]);

})();

