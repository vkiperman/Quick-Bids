(function(){

	var app = angular.module('Fixscroll', ['ModalService']);

	app.directive('fixScroll', ['$window', 'modalService', function($window, modalService){

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
			name: 'fixScroll',
			scope: {
				parentDepth: '=',
				fixedClass: '@'
			},
			restrict: 'A',

			link: function(scope, element, attrs, ctrl){
                var parentElement = element;
				for(var i = 0; i < attrs.parentDepth; i++){
					parentElement = parentElement.parent();
				}
                var windowEl = angular.element($window),
                	elementWidth = element[0].getBoundingClientRect().width,
                	originalTop = element[0].getBoundingClientRect().top,
                	formContainer = element.find('div').eq(0),
                	OFFSET_TOP = 20,
                	PARENT_OFFSET_TOP = parseInt(getStyle(parentElement[0], 'padding-top')),
                	top,
                	height,
            		parentTop,
            		parentBottom,
                	parentHeight,
                	boxHeight,
                	oldScrollPhase,

                	setPosition = function(styles, classAction){
                		element.css(styles);
                		if(scope.fixedClass){
	                		formContainer[classAction](scope.fixedClass);
	                	}
                	},
                	phaseWatcher = function(newValue, oldValue) {
						var params = [
							[
								{
		                			position: 'static',
		                			top: ''
	                			},
	                			'removeClass'
	                		],
							[
								{
		                			position: 'fixed',
		                			top: OFFSET_TOP + 'px'
	                			},
	                			'addClass'
	                		],
							[
								{
		                			position: 'absolute',
		                			top: (parentHeight - height) + 'px'
	                			},
	                			'removeClass'
	                		]
						];
						oldScrollPhase = oldValue;
						setPosition.apply(null, params[newValue-1]);
				    };

				scope.fixScroll = scope.$eval(attrs.fixScroll);
				scope.$watch('scrollPhase', phaseWatcher);

                element.css({width: elementWidth + 'px'});

                scope.$watch(
                	function(){
	                	return modalService.isModalVisible;
	                },
	        		function(newVal, oldVal){
	        			var map = {'true': 'static', 'false': 'relative'};
	        			parentElement.css({position: map[newVal]});
	        			oldScrollPhase = scope.scrollPhase;
	        			if(newVal == 'true'){
		        			scope.scrollPhase = 1;
		        		} else {
		        			scope.scrollPhase = oldScrollPhase;
		        		}
            		}
            	);
                //parentElement.css({position: 'relative'});

                if(scope.fixScroll){
	                windowEl.on('scroll', scope.$apply.bind(scope, function(){
	                	var elementRect = element[0].getBoundingClientRect(),
	                		parentRect = parentElement[0].getBoundingClientRect();

	                	if(modalService.isModalVisible == 'true') return;

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
			controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
				// TODO: fix-scroll
				$scope.scrollPhase = 1;
			}]
		};

	}]);

})();