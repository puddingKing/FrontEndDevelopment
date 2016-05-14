var mongoose = require('mongoose');
var LayoutSchema = new mongoose.Schema({
	name:String,
	layout:[],
	image:String,
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
LayoutSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

LayoutSchema.statics = {
	fetch:function(cb){
		return this.find({}).sort('meta.updateAt')
		.exec(cb)
	},
	findById:function(id,cb){
		return this.findOne({_id:id})
		.exec(cb)
	}
}

module.exports = LayoutSchema;