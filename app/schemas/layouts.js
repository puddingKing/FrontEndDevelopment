var mongoose = require('mongoose');
var Layout = require('../models/layout');
var User = require('../models/user');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var LayoutsSchema = new mongoose.Schema({
	designer: {
		type: ObjectId,
		ref:'User'
	},
	layouts:[{type: ObjectId,
		ref:'Layout'}],
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

LayoutsSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

LayoutsSchema.statics = {
	fetch:function(cb){
		return this.find({}).sort('meta.updateAt')
		.exec(cb)
	},
	findById:function(id,cb){
		return this.findOne({_id:id})
		.exec(cb)
	}
}

module.exports = LayoutsSchema;