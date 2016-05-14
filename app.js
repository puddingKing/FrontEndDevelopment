//入口文件
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var cookieSession = require('cookie-session');//?

var port = 3000 || process.env.PORT; //端口号，可能是在环境变量中的port值或者3000
var app = express();
var dbUrl = "mongodb://localhost/lakeChart";

mongoose.connect(dbUrl);

app.set('views','./app/views/pages'); //设置视图的目录路径
app.set('view engine','jade'); //设置试图的模板引擎
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(bodyParser.json({limit:'50mb'}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
	secret:'lakeChart',
	store:new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}));

require('./config/routes')(app);  //路由

app.locals.moment = require('moment');
app.listen(port);
console.log("lakeChart started on " + port);//输出服务是否启动

if('development' === app.get('env')){
	app.set('showStackError',true);
	app.use(morgan(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug',true);
}
