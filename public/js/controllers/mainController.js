(function() {

	var app = angular.module('MainCtrl', []);

	app.controller('MainCtrl', ['$scope', function($scope) {
		$scope.message = 'Hello World';
	}])
}());