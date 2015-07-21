'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    errorHandler = require('../errors.server.controller'),
    User = mongoose.model('User');

/**
 * List of Exam
 */
exports.list = function(req, res) {
    //Exam.find().sort('-created').populate('user', 'displayName').exec(function(err, exams) {
    //Exam.find().sort('-exam_name').exec(function(err, exams) {
    //User.find({'username':req.params.userName}).exec(function(err, users) {
    console.log(req.query.userName);
    User.find({'username':req.query.userName}).exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(users);
		}
	});
};
exports.list2 = function(req, res) {

    User.find().exec(function(err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(users);
        }
    });
};
exports.userByName = function(req, res, next, userName) {
    //Exam.find().sort('-created').populate('user', 'displayName').exec(function(err, exams) {
    //Exam.find().sort('-exam_name').exec(function(err, exams) {
    User.find({'username':userName}).exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user ' + userName));
        req.user1 = user;
        next();
    });
};
/**
 * exam middleware
 */
exports.userByID = function(req, res, next, id) {
	//Exam.findById(id).populate('user', 'displayName').exec(function(err, article) {
    //alert(id);
    console.log(id);
	User.findById(id).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load user ' + id));
		req.user = user;
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