var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    res.render('weather.ejs',{session:req.session})
})

module.exports = router