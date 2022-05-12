var express = require('express')
var User = require('../database/User')
var router = express.Router()

//라우팅 함수 등록

router.get('/',function(req,res){
    res.render('login.html')
});

router.post('/process', async (req, res) => {
    console.log('/process/login 처리함');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    //GET, POST 모두 고려해서 둘 다 검사

    const results = await User.login(paramId, paramPassword);

    if (results){
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param id : ' + paramId + '</p></div>');
        res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
        res.write("<br><br><a href ='/login.html'>로그인 페이지로 돌아가기</a>");
        res.end();
    } else {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h1>정보가 잘못되었습니다.</h1>');
        res.write('<div><p>Param id : ' + paramId + '</p></div>');
        res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
        res.write("<br><br><a href ='/login.html'>로그인 페이지로 돌아가기</a>");
        res.end();
    }
});

module.exports = router