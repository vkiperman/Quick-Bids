(function(){
	var OfferSearch = angular.module('OfferSearch', []);

	OfferSearch.directive('offerSearch', function(){

		return {
			restrict: 'E',
			templateUrl: '/includes/offer-search.html',

			controller: function($scope, $animate){
				$scope.toggleAdvanced = false;

				$scope.regions = [
					{label:'All',value:''},
					{label:'Region A',value:'a'},
					{label:'Region B',value:'b'},
					{label:'Region C',value:'c'}
				];

				$scope.bidStatuses = [
					{label:'Select',value:''},
					{label:'Bid 1',value:'1'},
					{label:'Bid 2',value:'2'},
					{label:'Bid 3',value:'3'},
					{label:'Bid 1',value:'1'},
					{label:'Bid 2',value:'2'},
					{label:'Bid 3',value:'3'}
				];

				$scope.bidders = [
					{label:'Select',value:''},
					{label:'George Washington',value:'1'},
					{label:'John Adams',value:'2'},
					{label:'Thomas Jefferson',value:'3'},
					{label:'James Madison',value:'1'},
					{label:'James Monroe',value:'2'},
					{label:'John Quincy Adams',value:'3'}
				];

				$scope.bidFilter = {
					regionSelected: $scope.regions[0],
					bidStatusSelected: $scope.bidStatuses[0],
					bidderSelected: $scope.bidders[0],
					bidStatusDateFrom: new Date(),
					bidStatusDateTo: new Date(),
					bidDateFrom: new Date(),
					bidDateTo: new Date(),
					customer: {}
				};
			},
			controllerAs: 'offerSearchCtrl'
		}
	});

})()