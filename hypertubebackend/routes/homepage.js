var express = require('express');
const { NotExtended } = require('http-errors');
var router = express.Router();

const authCheck = function(req, res, next){
    if(!req.user){
        res.redirect('/login')

    }else{
        next()
    }
}

router.get('/',authCheck, function(req, res){
    res.redirect("http://localhost:3000/homepage");

})

module.exports = router;