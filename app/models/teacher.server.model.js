'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Teacher Schema
 */
var TeacherSchema = new Schema({
	teacher_name: {
		type: String,
		default: ''
	},
	teacher_password: {
		type: String,
		default: '',
		trim: true,
		required: 'password cannot be blank'
	},
	teacher_birthday: {
		type: Date,
        default: Date.now,
		trim: true
	}

});

mongoose.model('Teacher', TeacherSchema);