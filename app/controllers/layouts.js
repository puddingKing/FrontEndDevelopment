var User = require('../models/user');
var Layout = require('../models/layout');
var Layouts = require('../models/layouts');
var _ = require('underscore');

exports.query=function(req,res){
	var user = req.session.user;
	var userId = user._id;
	Layouts.findOne({designer:userId},function(err,lays){
		if(lays){
			//res.json({layouts:lays.layouts});
			var array = lays.layouts;	
			var l = array.length;
			var layoutName = [];
			var layoutImages = [];
			for(var i=0;i<l;i++){
				if(array[i]){
					Layout.findById(array[i],function(err,lay){
					if(err){
						console.log(err);
					}else{
						var layName = lay.name;
						var layImage = lay.image;
						layoutName.push(layName);
						layoutImages.push(layImage);
						if(l == layoutName.length){
							console.log("querry Success array--"+array.length);
							console.log("auerry success"+layImage);
							res.json({layouts:lays.layouts,names:layoutName,images:layoutImages});
						}
					}
					})
				}	
			}			
		}
	})
}
