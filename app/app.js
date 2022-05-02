var express = require('express')
    , http = require('http')
    , path = require('path');

var bodyParser = require('body-parser')
    , static = require('serve-static');

var expressErrorHandler = require('express-error-handler');

var app = express();
//라우터 객체 참조
var router = express.Router();

//라우팅 함수 등록
router.route('/process/login/:name').post(function (req, res) {
    console.log('/process/login/:name 처리함');

    var paramName = req.params.name;

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    //GET, POST 모두 고려해서 둘 다 검사

    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h1>Result form Express Server</h1>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
    res.write("<br><br><a href ='/login3.html'>로그인 페이지로 돌아가기</a>");
    res.end();

});

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(static(path.join(__dirname, 'public')));

app.use('/', router);

//모든 router 처리가 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': 'C:/Users/mingyu/Desktop/git/rest_stop_list/app/public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), function () {
    console.log('익스프레스 서버를 시작했습니다.');
});