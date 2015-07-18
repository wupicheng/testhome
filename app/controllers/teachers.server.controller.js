'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Teacher = mongoose.model('Teacher'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
	var teacher = new Teacher(req.body);


    teacher.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(teacher);
		}
	});
};

/**
 * Show the current teacher
 */
exports.read = function(req, res) {
	res.json(req.teacher);
};

/**
 * Update a teacher
 */
exports.update = function(req, res) {
	var teacher = req.teacher;

    teacher = _.extend(teacher, req.body);

    teacher.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(teacher);
		}
	});
};

/**
 * Delete an teacher
 */
exports.delete = function(req, res) {
	var teacher = req.teacher;

    teacher.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(teacher);
		}
	});
};

/**
 * List of Teacher
 */
exports.list = function(req, res) {
    //Teacher.find().sort('-created').populate('user', 'displayName').exec(function(err, teachers) {
    //Teacher.find().sort('-teacher_name').exec(function(err, teachers) {
    Teacher.find().exec(function(err, teachers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(teachers);
		}
	});
};

/**
 * teacher middleware
 */
exports.teacherByID = function(req, res, next, id) {
	//Teacher.findById(id).populate('user', 'displayName').exec(function(err, article) {
	Teacher.findById(id).exec(function(err, teacher) {
		if (err) return next(err);
		if (!teacher) return next(new Error('Failed to load teacher ' + id));
		req.teacher = teacher;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
//	if (req.teacher.user.id !== req.user.id) {
//		return res.status(403).send({
//			message: 'User is not authorized'
//		});
//	}
	next();
};