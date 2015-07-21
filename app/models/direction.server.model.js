'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * 专业方向实体
 */
var DirectionSchema = new Schema({
	direction_name: {
		type: String,
		default: ''
	},
    direction_desc: {
		type: String,
		default: ''
    },
    direction_created: {
		type: Date,
        default: Date.now,
		trim: true
	}

});

mongoose.model('Direction', DirectionSchema);