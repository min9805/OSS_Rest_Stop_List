var express = require('express')
    , http = require('http')
    , path = require('path');

var bodyParser = require('body-parser')
    , static = require('serve-static');
var expressErrorHandler = require('express-error-handler');
var indexRouter = require('./routes/index')
var loginRouter = require('./routes/login')
var signupRouter = require('./routes/signup')
var lpgRouter = require('./routes/lpg')
var weatherRouter = require('./routes/weather')
var menuRouter = require('./routes/menu')
var csvRouter = require('./routes/csv')
var app = express();
var router = express.Router();

var cookieParser = require('cookie-parser')
var ExpressSession = require('express-session')

var database = require('./database/database');
var config = require('./config');


// get port
var port = process.env.PORT || 3000;
app.set('port',port);

//for using bodyParser
app.use(bodyParser.urlencoded({ extended: false }));



//ejs engine for html
app.set('views',__dirname+'/views')
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
//
//
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


//
app.use('/csv',csvRouter)
app.use('/menu',menuRouter)
app.use('/login',loginRouter);  // login page route
app.use('/weather',weatherRouter)
app.use('/lpg',lpgRouter)
app.use('/signup',signupRouter); // sign up page route
app.use('/', indexRouter);  // main page route


//Session 처리
app.use(cookieParser());
app.use(ExpressSession({
    secret:'key',
    resave: true,
    saveUninitialized:true
}));

//모든 router 처리가 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './rest_stop_list/app/public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database.db) {
		database.db.close();
	}
});


// for server listening 
var server = http.createServer(app)
server.listen(port,function(){
    console.log('익스프레스 서버를 시작했습니다.');

    database.init(app, config);
})

