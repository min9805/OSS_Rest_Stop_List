var express = require('express')
var Conn = require('../database/database')
var router = express.Router()

router.get('/',function(req,res){
    res.render('signup.ejs',{session:req.session})
});

router.post('/process', function(req, res) {
    var paramEmail = req.body.email || req.query.email;
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    //GET, POST 모두 고려해서 둘 다 검사
    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
	if (database.db) {
		addUser(database, paramId, paramPassword, paramName, paramEmail, function(err, addedUser) {
            // 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
			if (err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
            // 결과 객체 있으면 성공 응답 전송
			if (addedUser) {    
				console.dir(addedUser);
 
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
                res.write("<br><br><a href='/login'>로그인하기</a>");
				res.end();
			} else {  // 결과 객체가 없으면 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
                res.write("<br><br><a href='/signup'>다시 가입하기</a>");
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
});
//사용자를 등록하는 함수
var addUser = function(database, id, password, name, email, callback) {
	
	// UserModel 인스턴스 생성
	var user = new database.UserModel({"id":id, "password":password, "name":name,"email":email});
	// save()로 저장
	user.save(function(err) {
		if (err) {
			callback(err, null);
			return;
		}
		
	    callback(null, user);
	     
	});
}
module.exports = router