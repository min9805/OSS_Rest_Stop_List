var express = require('express')
var router = express.Router()

//라우팅 함수 등록

router.get('/',function(req,res){
    res.render('login.html')
});

router.post('/process', function(req, res) {
    console.log('/process/login 처리함');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    //GET, POST 모두 고려해서 둘 다 검사

    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h1>Result form Express Server</h1>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
    res.write("<br><br><a href ='/login.html'>로그인 페이지로 돌아가기</a>");
    res.end();
});

module.exports = router