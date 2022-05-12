var express = require('express')
var Conn = require('../database/Connection')
var router = express.Router()

router.get('/',function(req,res){
    res.render('views/signup.html')
});


router.post('/process', function(req, res) {
    console.log('/signup/process 처리함');

    var paramName = req.body.name || req.query.name;
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    //GET, POST 모두 고려해서 둘 다 검사

    if(Conn.pool){
        Conn.adduser(paramName, paramId, paramPassword, function(err, addedUser) {
            if(err){
                console.error(err.stack);
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h1>추가 중 오류</h1>');
                res.write('<div><p>Param name : ' + paramName + '</p></div>');
                res.write('<div><p>Param id : ' + paramId + '</p></div>');
                res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
                res.write("<br><br><a href ='/login.html'>로그인 페이지로 돌아가기</a>");
                res.end();
            
            return;
            }
            if (addedUser){
                console.dir(addedUser);

                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h1>회원가입 성공</h1>');
                res.write('<div><p>Param name : ' + paramName + '</p></div>');
                res.write('<div><p>Param id : ' + paramId + '</p></div>');
                res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
                res.write("<br><br><a href ='/login.html'>로그인 페이지로 돌아가기</a>");
                res.end();
            } else {
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h1>회원가입 실패.</h1>');
                res.write('<div><p>Param id : ' + paramId + '</p></div>');
                res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
                res.write("<br><br><a href ='/login.html'>로그인 페이지로 돌아가기</a>");
                res.end();
            }
            
        })
    }else{
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.end();
    }


});

module.exports = router