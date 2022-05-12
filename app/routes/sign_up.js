var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    res.render('sign_up.html')
})

module.exports = router