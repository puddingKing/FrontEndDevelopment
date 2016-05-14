var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var User = require('../models/user');

var GroupSchema = new mongoose.Schema({
	creator:{
		type: ObjectId,
		ref:'User'
	},
	name:String,
	uniqueSign:String,
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

GroupSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

GroupSchema.statics = {
	fetch:function(cb){
		return this.find({}).sort('meta.updateAt')
		.exec(cb)
	},
	findById:function(id,cb){
		return this.findOne({_id:id})
		.exec(cb)
	}
}

module.exports = GroupSchema;