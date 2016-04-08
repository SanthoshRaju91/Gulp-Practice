(function() {

	var app = angular.module('App', ['ui.router', 'MainCtrl', 'PubCtrl'])

	app.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/main');

		$stateProvider
			.state('main', {
				url: '/main',
				templateUrl: 'views/main.html',
				controller:'MainCtrl'
			})
			.state('main.pub', {
				url: '/pub',
				templateUrl: 'views/pub.html',
				controller: 'PubCtrl'
			});
	});
}());