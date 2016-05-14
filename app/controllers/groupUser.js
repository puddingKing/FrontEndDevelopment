var Group = require('../models/group');
var User = require('../models/user');
var GroupUser = require('../models/groupUser');
var fs = require('fs');
var formidable = require('formidable');
var _ = require('underscore');

exports.save = function(req,res){
	var groupId = req.body.id;
	var grouper = req.body.userName;
	var userState;
	User.findOne({name:grouper},function(err,user){
		if (err) {
			console.log(err);
		}else{
			if(user.length < 1){
				console.log("用户不存在");
				userState = 0;
				res.json({
					"success":1,
					"userState":userState
				})
			}else{
				console.log("用户存在"+user['sculpture']);
				GroupUser.find({member:user._id},function(err,gus){
					if(err){
						console.log(err);
					}
					if (gus.length >= 1) {
						var flag = 0;
						for (var i = 0; i < gus.length; i++) {
							if(gus[i].group == groupId){	
								flag = 0;
							}else{
								flag = 1;
							}
						}
						if (flag == 0) {
							userState = 1;
							res.json({
								"success":1,
								"userState":userState
							})
						}else{
							userState = 2;
							var _groupUser = {
								"group":groupId,
								"member":user._id
							}
							var groupUserObj = new GroupUser(_groupUser);
							groupUserObj.save(function(err,gur){
								if(err){
									console.log(err);
								}else{
									console.log(gur);
									res.json({
										"success":1,
										"userState":userState
									})
								}
							});
						}			
					}else{
						console.log("用户不在组中，可以邀请");
						userState = 2;
						var _groupUser = {
							"group":groupId,
							"member":user._id
						}
						var groupUserObj = new GroupUser(_groupUser);
						groupUserObj.save(function(err,gur){
							if(err){
								console.log(err);
							}else{
								console.log(gur);
								res.json({
									"success":1,
									"userState":userState
								})
							}
						});
					}
				})
			}
		}
	})
}
exports.queryUser = function(req,res){
	var n = req.body.userName;
	User.findOne({name:n},function(err,user){
		if (err) {
			console.log(err);
		}else{
			if (user == null) {

			}else{
				console.log(user.sculpture);
				res.json({'user':user});
			}
			
		}
	})
}
exports.query = function(req,res){
	var groupId = req.body.id;
	GroupUser.find({group:groupId},function(err,groupUsers){
		if (err) {
			console.log(err);
		}else{
			console.log("groupUsers为:"+groupUsers[2]);
			var results = [];
			var a = [];
			for (var i = 0; i < groupUsers.length; i++) {
				console.log("start====");
				results[i] = function(num){
					User.findOne({_id:groupUsers[num].member},function(err,user){
						console.log(groupUsers[num].member);
						if(err){
							console.log(err);
						}else{
							a.push(user);
							
							if(a.length == groupUsers.length){
								console.log("user 查询成功"+a.length);
								res.json({'success':1,'gus':a});
							}
						}
					})
				}(i);
			}						
		}
	})
}