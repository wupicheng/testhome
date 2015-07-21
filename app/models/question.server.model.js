'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * 知识点对象实体
 */
var QuestionSchema = new Schema({
    question_titile: {
		type: String,
		default: ''
	},
    question_content: {
        type: String,
        default: ''
    },
    question_hard: { //题目难度系数
        type: String,
        default: '1'
    },
    question_created: {
		type: Date,
        default: Date.now,
		trim: true
	},
    course: {       //所属的课程，外部引入
        type: Schema.ObjectId,
        ref: 'Course'
    },
    question_choices: {
        type: [{
            type: Schema.ObjectId,
            ref: 'Choice'
        }]
    },
    question_answer:{
        type: String,
        default: '',
        trim: true
    }

});

mongoose.model('Course', PointSchema);