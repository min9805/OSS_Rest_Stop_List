var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    res.render('menu.ejs',{session:req.session})
})

module.exports = router