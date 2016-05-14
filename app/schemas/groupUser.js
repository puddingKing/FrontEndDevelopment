var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var User = require('../models/user');
var Group = require('../models/group');

var GroupUserSchema = new mongoose.Schema({
	group:{
		type: ObjectId,
		ref:'Group'
	},
	member:{
		type:ObjectId,
		ref:'User'
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

GroupUserSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

GroupUserSchema.statics = {
	fetch:function(cb){
		return this.find({}).sort('meta.updateAt')
		.exec(cb)
	},
	findById:function(id,cb){
		return this.findOne({_id:id})
		.exec(cb)
	}
}

module.exports = GroupUserSchema;