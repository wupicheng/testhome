'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	exams = require('../../app/controllers/exams.server.controller');

module.exports = function(app) {
	// Teacher Routes
	app.route('/exams')
		.get(exams.list)
		.post(users.requiresLogin, exams.create);

	app.route('/exams/:examId')
		.get(exams.read)
		.put(users.requiresLogin, exams.hasAuthorization, exams.update)
		.delete(users.requiresLogin, exams.hasAuthorization, exams.delete);

	// Finish by binding the exam middleware
	app.param('examId', exams.examByID);
};