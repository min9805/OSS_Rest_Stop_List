var express = require('express')
var router = express.Router()

/*
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
*/
router.get('/',function(req,res){
    res.render('login.html')
})



module.exports = router