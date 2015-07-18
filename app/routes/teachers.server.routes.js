'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	teachers = require('../../app/controllers/teachers.server.controller');

module.exports = function(app) {
	// Teacher Routes
	app.route('/teachers')
		.get(teachers.list)
		.post(users.requiresLogin, teachers.create);

	app.route('/teachers/:teacherId')
		.get(teachers.read)
		.put(users.requiresLogin, teachers.hasAuthorization, teachers.update)
		.delete(users.requiresLogin, teachers.hasAuthorization, teachers.delete);

	// Finish by binding the teacher middleware
	app.param('teacherId', teachers.teacherByID);
};