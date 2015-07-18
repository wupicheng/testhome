'use strict';

//Stus service used for communicating with the stus REST endpoints
angular.module('stus').factory('Stus', ['$resource',
	function($resource) {
		return $resource('stus/:stuId', {
			stuId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);