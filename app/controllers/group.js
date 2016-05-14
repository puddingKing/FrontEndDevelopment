var Group = require('../models/group');
var GroupUser = require('../models/groupUser');
var fs = require('fs');
var formidable = require('formidable');
var _ = require('underscore');

exports.save = function(req,res){	
	var _user = req.session.user;
	var groupName = req.body.name;
	var groupSign = req.body.sign;
	var group = new Group();

	group.creator = _user._id;
	group.name = groupName;
	group.uniqueSign = groupSign;
	console.log('session' + _user.password);
	console.log('session' + groupName);
	console.log('session' + groupName);
	group.save(function(err,gp){
		console.log("save group!");
		res.json({'success':1});
	})	
}
exports.query = function(req,res){
	var _user = req.session.user;
	var userId = _user._id;
	Group.find({creator:userId},function(err,gps){
		if(err){
			console.log(err);
		}else{
			res.render('queryGroup',{
				title:'管理工作组',
				groups:gps
			})
		}
	})
}
exports.delete = function(req,res) {
	var id = req.body.id;
	console.log("delete group id:"+id);
	Group.remove({_id:id},function(err,group){
		if (err) {
			console.log(err);
		}else{
			GroupUser.remove({group:id},function(err,group){
				if (err) {
					console.log(err);
				}else{
					res.json({"success":1});
				}
			})
		}
	})
}