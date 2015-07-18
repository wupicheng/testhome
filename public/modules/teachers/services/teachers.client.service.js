'use strict';

//Teachers service used for communicating with the teachers REST endpoints
angular.module('teachers').factory('Teachers', ['$resource',
	function($resource) {
		return $resource('teachers/:teacherId', {
			teacherId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);