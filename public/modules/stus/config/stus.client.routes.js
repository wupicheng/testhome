'use strict';

// Setting up route
angular.module('stus').config(['$stateProvider',
	function($stateProvider) {
		// Stu state routing
		$stateProvider.
		state('listStu', {
			url: '/stus',
			templateUrl: 'modules/stus/views/list-stus.client.view.html'
		}).
		state('createStu', {
			url: '/stus/create',
			templateUrl: 'modules/stus/views/create-stu.client.view.html'
		}).
		state('viewStu', {
			url: '/stus/:stuId',
			templateUrl: 'modules/stus/views/view-stu.client.view.html'
		}).
		state('editStu', {
			url: '/stus/:stuId/edit',
			templateUrl: 'modules/stus/views/edit-stu.client.view.html'
		});
	}
]);