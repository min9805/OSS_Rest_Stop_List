var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    res.render('lpg.ejs',{session:req.session})
})

module.exports = router