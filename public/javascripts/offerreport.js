//offerreport.js
(function(){
	var OfferReport = angular.module('OfferReport', [
		'HeaderMenu', 
		'CustomerInfo', 		
		'ReportDashboardContent', 
		'Statistics',	
		'NotificationSearch',	
		'NotificationSearchResults',
		'ReportView',
		'GlobalFooter'
	]);

	OfferReport.controller('OfferReportCtrl', ['$scope', '$location', function($scope, $location){

		$scope.reportView = false;

	}]);

})();