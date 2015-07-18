'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Stu Schema
 */
var StuSchema = new Schema({
	stu_name: {
		type: String,
		default: ''
	},
	stu_password: {
		type: String,
		default: '',
		trim: true,
		required: 'password cannot be blank'
	},
	stu_birthday: {
		type: Date,
        default: Date.now,
		trim: true
	}

});

mongoose.model('Stu', StuSchema);