'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Exam = mongoose.model('Exam'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
	var exam = new Exam(req.body);


    exam.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(exam);
		}
	});
};

/**
 * Show the current exam
 */
exports.read = function(req, res) {
	res.json(req.exam);
};

/**
 * Update a exam
 */
exports.update = function(req, res) {
	var exam = req.exam;

    exam = _.extend(exam, req.body);

    exam.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(exam);
		}
	});
};

/**
 * Delete an exam
 */
exports.delete = function(req, res) {
	var exam = req.exam;

    exam.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(exam);
		}
	});
};

/**
 * List of Exam
 */
exports.list = function(req, res) {
    //Exam.find().sort('-created').populate('user', 'displayName').exec(function(err, exams) {
    //Exam.find().sort('-exam_name').exec(function(err, exams) {
    Exam.find().exec(function(err, exams) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(exams);
		}
	});
};

/**
 * exam middleware
 */
exports.examByID = function(req, res, next, id) {
	//Exam.findById(id).populate('user', 'displayName').exec(function(err, article) {
	Exam.findById(id).exec(function(err, exam) {
		if (err) return next(err);
		if (!exam) return next(new Error('Failed to load exam ' + id));
		req.exam = exam;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
//	if (req.exam.user.id !== req.user.id) {
//		return res.status(403).send({
//			message: 'User is not authorized'
//		});
//	}
	next();
};