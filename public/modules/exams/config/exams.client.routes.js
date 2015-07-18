'use strict';

// Setting up route
angular.module('exams').config(['$stateProvider',
	function($stateProvider) {
		// Exam state routing
		$stateProvider.
		state('listExam', {
			url: '/exams',
			templateUrl: 'modules/exams/views/list-exams.client.view.html'
		}).
        state('listExamIsGoing', {
                url: '/exams/examsisgoing',
                templateUrl: 'modules/exams/views/list-isgoing-exams.client.view.html'
            }).
         state('listExamIsDone', {
                url: '/exams/examisdone',
                templateUrl: 'modules/exams/views/list-isdone-exams.client.view.html'
            }).
		state('createExam', {
			url: '/exams/create',
			templateUrl: 'modules/exams/views/create-exam.client.view.html'
		}).
		state('viewExam', {
			url: '/exams/:examId',
			templateUrl: 'modules/exams/views/view-exam.client.view.html'
		}).
		state('editExam', {
			url: '/exams/:examId/edit',
			templateUrl: 'modules/exams/views/edit-exam.client.view.html'
		});
	}
]);