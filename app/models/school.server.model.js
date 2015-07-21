'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * 所属校区对象实体
 */
var SchoolSchema = new Schema({
	school_name: {
		type: String,
		default: ''
	},
    school_desc: {
		type: String,
		default: ''
    },
    school_created: {
		type: Date,
        default: Date.now,
		trim: true
	}

});

mongoose.model('School', SchoolSchema);