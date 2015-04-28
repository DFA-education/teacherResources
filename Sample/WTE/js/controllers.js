var wte = angular.module('wte', []);

wte.controller('master', ['$scope', '$http', function($scope, $http) {

	$scope.problems = [];

    $scope.init = function() {

    	args = {
    		url: location.origin,
    		method: "GET",
    		params: {
    			type: "select",
    			table: "Problems",
    			filters: {
    				topic: getQueryParams('topic')
    			}
    		}
    	};
    	console.log(args);
    	$http(args).
		  	success(function(data, status, headers, config) {
		    	$scope.problems = data;
		  	}).
		  	error(function(data, status, headers, config) {
		    	// called asynchronously if an error occurs
		    	// or server returns response with an error status.
		  	});
	};

    $scope.init();
}])
