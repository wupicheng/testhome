'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	stus = require('../../app/controllers/stus.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/stus')
		.get(stus.list)
		.post(users.requiresLogin, stus.create);

	app.route('/stus/:stuId')
		.get(stus.read)
		.put(users.requiresLogin, stus.hasAuthorization, stus.update)
		.delete(users.requiresLogin, stus.hasAuthorization, stus.delete);

	// Finish by binding the stu middleware
	app.param('stuId', stus.stuByID);
};