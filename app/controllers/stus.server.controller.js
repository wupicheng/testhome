'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    Stu = mongoose.model('Stu'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
	var stu = new Stu(req.body);


    stu.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(stu);
		}
	});
};

/**
 * Show the current stu
 */
exports.read = function(req, res) {
	res.json(req.stu);
};

/**
 * Update a stu
 */
exports.update = function(req, res) {
	var stu = req.stu;

    stu = _.extend(stu, req.body);

    stu.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(stu);
		}
	});
};

/**
 * Delete an stu
 */
exports.delete = function(req, res) {
	var stu = req.stu;

    stu.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(stu);
		}
	});
};

/**
 * List of Stu
 */
exports.list = function(req, res) {
    //Stu.find().sort('-created').populate('user', 'displayName').exec(function(err, stus) {
    //Stu.find().sort('-stu_name').exec(function(err, stus) {
    Stu.find().exec(function(err, stus) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(stus);
		}
	});
};

/**
 * stu middleware
 */
exports.stuByID = function(req, res, next, id) {
	//Stu.findById(id).populate('user', 'displayName').exec(function(err, article) {
	Stu.findById(id).exec(function(err, stu) {
		if (err) return next(err);
		if (!stu) return next(new Error('Failed to load stu ' + id));
		req.stu = stu;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
//	if (req.stu.user.id !== req.user.id) {
//		return res.status(403).send({
//			message: 'User is not authorized'
//		});
//	}
	next();
};