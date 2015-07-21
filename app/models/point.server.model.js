'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * 知识点对象实体
 */
var PointSchema = new Schema({
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
    course: {       //所属的课程，外部引入
        type: Schema.ObjectId,
        ref: 'Course'
    }

});

mongoose.model('Course', PointSchema);