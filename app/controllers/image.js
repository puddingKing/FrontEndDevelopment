var User = require('../models/user');
var UserImage = require('../models/image');

exports.query = function(req,res){
	var userObj = req.session.user;
	var userId = userObj._id;
	UserImage.find({user:userId},function(err,userImages){	
		var imageArray = [];
		imageArray = userImages;
		res.json({images:imageArray});
	})
}
exports.delImg = function(req,res){
	var id = req.query.id;
	if (id) {
		UserImage.remove({url:id},function(err,image){
			if (err) {
				console.log(err);
			}else{
				res.json({success:1});
			}
		})
	};
}