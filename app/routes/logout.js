var Conn = require('../database/database')
var express = require('express')
var router = express.Router();

//라우팅 함수 등록

router.get('/',function(req,res){
	req.session.destroy(function() {
		req.session;
		res.redirect('/');
	});
});

module.exports = router