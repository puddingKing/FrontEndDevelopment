//负责和首页交互
exports.index = function(req,res){
	console.log("是否有用户登录");
	console.log(req.session.user);

	var _user = req.session.user;
	res.render('index',{
		title:'首页'
	})
}

