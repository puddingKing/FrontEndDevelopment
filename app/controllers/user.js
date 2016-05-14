var User = require('../models/user');
var fs = require('fs');
var formidable = require('formidable');
var _ = require('underscore');

exports.index = function(req,res){
	console.log('进入用户个人中心----');
	var _user = req.session.user;
	console.log('session' + _user.password);
	User.findOne({name:_user.name},function(err,user){
		console.log('-----------nickName' + user.nickName);
		res.render('userIndex',{
			title: '用户个人中心',
			user: user
		})
	})
	
}

exports.load = function(req,res){
	console.log('进入用户登录页面');
	res.render('signin',{
		title: '登录页面'
	})
}

exports.signup = function(req,res){
	console.log('signup start ----')
	var _user = req.body.user;
	var userObj = new User(_user);
	User.find({name:_user.name},function(err,user){
		console.log("User find start");
		if(err){
			console.log(err);
		}
		if(user.length >= 1){
			console.log(_user.name + "注册失败");
			return res.redirect('/');		
		}else{
			userObj.save(function(err,user){
				if(err){
					console.log(err);
				}
			})
			console.log(_user.name+"你好,注册成功");
			return res.redirect('/signin');
		}
	})
}

exports.signin = function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;
	User.findOne({name:name},function(err,user){
		if(user){
			if(user.password == password){
				console.log("登录成功！");
				req.session.user = user;
				console.log(req.session.user);
			}else{
				console.log("登录失败！")
			}
		}else{
			console.log("登录失败！");
		}
		return res.redirect('/');		
	})
}

exports.logout = function(req,res){
	delete req.session.user;
	//delete app.locals.user;
	res.redirect('/');
}

// midware for user
exports.signinRequired = function(req, res, next) {
  var user = req.session.user;
  if (!user) {
    return res.redirect('/signin');
  }
  next();
}
exports.setInfo = function(req,res){
	console.log("setInfo start --");
	var usersess = req.session.user;
	var userObj = req.body.user;
	var _user;
	console.log(userObj);
	User.findOne({name:usersess.name},function(err,user){
		_user = _.extend(user,userObj);
		_user.save(function(err,user){
			res.redirect('/userCenter');
		})
	})
}

//上传头像并保存到数据库中
exports.uploadImg = function(req,res){
	console.log("upload start -- ")
	var form = new formidable.IncomingForm();
	var userObj = req.session.user;
	var _user;
	form.uploadDir = "./public/upload/temp/";
	console.log("--uploadDir")
	form.parse(req,function(error,fields,files){
		for(var key in files){
			var file = files[key];
			var fName = (new Date()).getTime();
			switch(file.type){
				case "image/jpeg":
					fName = fName + ".jpg";
					break;
				case "image/png":
					fName = fName + ".png";
					break;
				default:
				 	fName = fName + ".png";
				 	break;
			}
			console.log(file.size);
			var uploadDir = "./public/upload/sculpture/"+fName;
			var _path = "/upload/sculpture/"+fName;
			fs.rename(file.path,uploadDir,function(err){
				if (err) {
					res.write(err+'\n'); 
					res.end();
				}
				console.log("fName:" + fName);
				res.json({path: _path});		
			})
			userObj.sculpture = "/upload/sculpture/" + fName;
			User.findOne({name:userObj.name},function(err,user){
				if(user){
					_user = _.extend(user,userObj);
					_user.save(function(err,user2){
						console.log("_user save DB success!" + user2);
					})
				}
			})
		}
	})
}