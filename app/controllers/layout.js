var User = require('../models/user');
var Layout = require('../models/layout');
var Layouts = require('../models/layouts');
var UserImage = require('../models/image');
var formidable = require('formidable');
var _ = require('underscore');
var fs = require('fs');

exports.index = function(req,res){
	console.log('进入创建主页面--');
	if (req.params.id) {
		var layId = req.params.id;
		Layout.findById({_id:layId},function(err,lay){
			res.render('createIndex',{
				title:'显示一个布局',
				id:layId,
				image: lay.image,
				divs:JSON.stringify(lay.layout)
			})
		})
	}else{
		res.render('createIndex',{
			title:'创建一个布局'
		})
	}
}
exports.update = function(req,res){
	var array = req.body.layout;
	var id = req.body.id;
	var fName = req.body.fName;
	var imgData = req.body.imageData;
	var base64Data = imgData.replace(/^data:image\/\w+;base64,/,"");
	var dataBuffer = new Buffer(base64Data,'base64');
	var userObj = req.session.user;
	var userId = userObj._id;
	var layoutObj = {
		'layout':array,
	}
	var _lay;
	fs.writeFile("./public/upload/sculpture/"+fName+".png",dataBuffer,function(err){
		if (err) {
			console.log(err);
		}else{
			Layout.findById({_id:id},function(err,lay){
				_lay = _.extend(lay,layoutObj);
				_lay.save(function(err,lay2){
					res.json({'success':1});
				})
			})
		}
	})
}
//创建一个布局
exports.save = function(req,res){
	var array = req.body.layout; //这是一个数组
	console.log("save start ---layout"+array.length);
	var name = req.body.name;
	var imgData = req.body.imageData;	
	var base64Data = imgData.replace(/^data:image\/\w+;base64,/,"");
	var dataBuffer = new Buffer(base64Data,'base64');
	var userObj = req.session.user;
	var userId = userObj._id;
	var layoutObj = new Layout();
	var layoutsObj;
	layoutObj.layout = array;
	layoutObj.name = name;
	var fName = (new Date()).getTime();
	layoutObj.image = fName;
	// var _dirname = "./public/";
	fs.writeFile("./public/upload/sculpture/"+fName+".png",dataBuffer,function(err){
		if (err) {
			console.log(err);
		}else{			
			layoutObj.save(function(err,lay){  //保存一个布局 
				var layId = lay._id;
				Layouts.findOne({designer: userId},function(err,lays){  //添加到用户的布局集中
					var laysTemp = [];		
					if(lays){
						console.log("添加前"+lays.layouts.length);
						laysTemp = lays.layouts;
						laysTemp.push(layId);
						lays.layouts = laysTemp;				
						lays.save(function(err,lays2){
							console.log("添加成功"+laysTemp);
							res.json({'success':1,'id':layId,'fName':fName});
						})
					}else{
						layoutsObj = new Layouts(); 
						laysTemp.push(lay);
						layoutsObj.designer = userId;
						layoutsObj.layouts = laysTemp;			
						layoutsObj.save(function(err,lays2){
							console.log("新建成功");
							res.json({'success':1,'id':layId});
						})
					}
				})
			})			
		}
	})
}

exports.query=function(req,res){
	console.log("layout:id success");
	var layId = req.params.id;
	Layout.findById({_id:layId},function(err,lay){
		res.redirect("/showLayout/"+layId);
	})
}

exports.show = function(req,res){
	console.log("showLayout start");
	var layId = req.params.id;
	Layout.findById({_id:layId},function(err,lay){
		res.render('showLayout',{
			title:'显示一个布局',
			layout:lay,
			divs:JSON.stringify(lay.layout)
		})
	})
	
}
exports.del = function(req,res){
	console.log("delete");
	var id = req.query.id;
	var user = req.session.user;
	var userId = user._id;
	var layObj = {};
	if(id){
		Layouts.findOne({designer:userId},function(err,lays){
			var array = lays.layouts;
			var array2 = [];
			var l = array.length;
			console.log("长度：l = "+l);
			console.log("id = "+id);
			for (var i = 0; i < l; i++) {
				console.log("array[i] = "+array[i]);
				console.log("array[i]和id是否相等 = =");
				if(array[i] != id){
					array2.push(array[i]);
				}else{
					console.log("相等");
				}
			}
			lays.layouts = array2;
			lays.save(function(err,lays2){
				console.log("success lays updata");
				Layout.remove({_id:id},function(err,layout){
					if(err){
						console.log(err);
					}else{
						res.json({success:1});
					}
				})
			 console.log("保存成功");
			 console.log("layouts的值:"+lays.layouts.length);
			})
		})
	}
}
exports.uploadDivBg = function(req,res){
	console.log("upload start -- ");
	var userObj = req.session.user;
	var userId = userObj._id;
	var form = new formidable.IncomingForm();
	form.uploadDir = "./public/upload/temp/";
	console.log("--uploadDir");
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
			console.log("hello"+file.type);
			console.log(file.path);
			var uploadDir = "./public/upload/div/"+fName;
			var _path = "/upload/div/"+fName;
			fs.rename(file.path,uploadDir,function(err){
				if (err) {
					res.write(err+'\n'); 
					res.end();
				}
				var userImage = new UserImage();
				userImage.user = userId;
				userImage.url = fName;
				userImage.name = 'image1';
				userImage.save(function(err,uImage){
					console.log("fName:" + uImage.url);
					res.json({path: _path});
				});			
			})	
		}
	})
}