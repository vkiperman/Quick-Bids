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
			},

			replace: true,

			link: function(scope, element, attrs, ctrl){
                var windowEl = angular.element($window),
                	elementWidth = element[0].offsetWidth,
                	originalTop = element[0].getBoundingClientRect().top,
                	parentElement = element.parent().parent(),
                	OFFSET_TOP = 20,
                	PARENT_OFFSET_TOP = parseInt(getStyle(parentElement[0], 'padding-top')),
                	top,
                	height,
            		parentTop,
            		parentBottom,
                	parentHeight,
                	boxHeight;

                element.css({width: elementWidth + 'px'});
                parentElement.css({position: 'relative'});

                windowEl.on('scroll', scope.$apply.bind(scope, function(){
                	top = element[0].getBoundingClientRect().top;
	                height = element[0].getBoundingClientRect().height;
                	parentTop = parentElement[0].getBoundingClientRect().top;
                	parentBottom = parentElement[0].getBoundingClientRect().bottom;
	                parentHeight = parentElement[0].getBoundingClientRect().height;
	                boxHeight = height + 
	                		parseInt(getStyle(element[0], 'padding-top')) +
                			parseInt(getStyle(element[0], 'padding-bottom')) +  
	                		parseInt(getStyle(element[0], 'border-top-width')) +
	                		parseInt(getStyle(element[0], 'border-bottom-width')) +
                			parseInt(getStyle(element[0], 'margin-top')) +
                			parseInt(getStyle(element[0], 'margin-bottom'));

                	// this works in all browsers
                	if(parentBottom < Math.round(boxHeight) + OFFSET_TOP ){                		
                		element.css({position: 'absolute', top: (parentHeight - height) + 'px'});

                	} else if(parentTop <= PARENT_OFFSET_TOP){
                		element.css({position: 'fixed', top: OFFSET_TOP + 'px'});
                		element.find('div').eq(0).addClass('boxShadow');

                	} else {
                		element.css({position: 'static'});
                		element.find('div').eq(0).removeClass('boxShadow');
                	}

                }));
			},

			controllerAs: 'BidFormCtrl'

		};

	}]);

})();

