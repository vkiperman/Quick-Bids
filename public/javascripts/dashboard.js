(function(){
	var Dashboard = angular.module('Dashboard', [
		'ngAnimate',
		'HeaderMenu', 
		'CustomerInfo', 
		'DashboardContent', 
		'OfferSearch',
		'OfferSearchResults', 
		'GlobalFooter'
	]);

	Dashboard.animation('.my-show-hide-animation', function() {
		return {
		    beforeAddClass : function(element, className, done) {
		    	if(className === 'ng-hide') {
			        angular.element(element).animate({
			        	opacity:0
			        }, done);
		    	} else {
		        	done();
		    	}
		    },
		    removeClass : function(element, className, done) {
		    	if(className === 'ng-hide') {
			        element.css('opacity',0);
			        angular.element(element).animate({
			        	opacity:1
			        }, done);
		    	} else {
		    		done();
		    	}
		    }
		};
	});

})();