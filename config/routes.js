var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Layout = require('../app/controllers/layout');
var Layouts = require('../app/controllers/layouts');
var Group = require('../app/controllers/group');
var UserImage = require('../app/controllers/image');
var GroupUser = require('../app/controllers/groupUser');
var _ = require('underscore');

module.exports = function(app){
	app.use(function(req,res,next){
		var _user = req.session.user;
		app.locals.user = _user;
		return next();
	})
	//index page
	app.get('/',User.signinRequired,Index.index);

	app.get('/signin',User.load);
	app.get('/userCenter',User.signinRequired,User.index);
	app.post('/user/signin',User.signin);
	app.post('/user/signup',User.signup);
	app.get('/logout',User.logout);
	app.post('/uploadImg',User.uploadImg,User.index);
	app.post('/user/setInfo',User.setInfo)

	app.get('/createLayout',User.signinRequired,Layout.index);
	app.get('/createLayout/:id',Layout.index);
	app.post('/saveLayout',Layout.save);
	app.post('/updateLayout',Layout.update);
	app.post('/queryLayouts',Layouts.query);
	app.get('/layout/:id',Layout.query);
	app.get('/showLayout/:id',Layout.show);
	app.delete('/layoutDelete',Layout.del);
	app.post('/uploadImage',Layout.uploadDivBg);

	app.post('/queryUserImage',UserImage.query);
	app.delete('/deleteImage',UserImage.delImg);
	app.post('/createGroup',Group.save);
	app.get('/queryGroup',Group.query);
	app.post('/deleteGroup',Group.delete);

	app.post('/queryGroupers',GroupUser.query);
	app.post('/saveGrouper',GroupUser.save);
	app.post('/queryUser',GroupUser.queryUser);
}
