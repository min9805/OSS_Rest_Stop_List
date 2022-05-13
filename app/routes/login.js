var express = require('express')
var Conn = require('../database/Connection')
var router = express.Router()

//라우팅 함수 등록

router.get('/',function(req,res){
    res.render('login.html')
});

router.post('/process', function(req, res) {
    console.log('/login/process 처리함');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    //GET, POST 모두 고려해서 둘 다 검사

    if(Conn.pool){
        Conn.authUser(paramId, paramPassword, function(err, rows) {
            if(err){
                console.error(err.stack);
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h1>로그인 중 오류</h1>');
                res.write('<div><p>Param id : ' + paramId + '</p></div>');
                res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
                res.write("<br><br><a href ='/login'>로그인 페이지로 돌아가기</a>");
                res.end();
            
            return;
            }
            if (rows){
                console.dir(rows);

                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h1>로그인 성공</h1>');
                res.write('<div><p>Param name : ' + rows[0].name + '</p></div>');
                res.write('<div><p>Param id : ' + paramId + '</p></div>');
                res.write("<br><br><a href ='/login'>로그인 페이지로 돌아가기</a>");
                res.end();
            } else {
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h1>로그인 실패.</h1>');
                res.write('<div><p>Param id : ' + paramId + '</p></div>');
                res.write("<br><br><a href ='/login'>로그인 페이지로 돌아가기</a>");
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