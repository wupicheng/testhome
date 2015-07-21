'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * 题目的每个选项    A  一个   A:choice_num 一个 choice_title
 */
var ChoiceSchema = new Schema({
    choice_num: {
		type: String,
		default: ''
	},
    choice_title: {
		type: String,
		default: ''
    }

});

mongoose.model('Choice', ChoiceSchema);