'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * 所属校区对象实体
 */
var CourseSchema = new Schema({
    course_name: {
		type: String,
		default: ''
	},
    course_desc: {
		type: String,
		default: ''
    },
    course_created: {
		type: Date,
        default: Date.now,
		trim: true
	},
    direction: {       //所属的专业方向，外部引入
        type: Schema.ObjectId,
        ref: 'Direction'
    }

});

mongoose.model('Course', CourseSchema);