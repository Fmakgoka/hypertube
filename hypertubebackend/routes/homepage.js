var express = require('express');
const { NotExtended } = require('http-errors');
var router = express.Router();
const {authJWT}= require('../middleware')

const authCheck = function(req, res, next){
    if(!req.user){
        console.log('not auth')
        res.redirect("http://localhost:3000/login");

    }else{
        next()
    }
}

router.get('/' ,[authJWT.verifyToken],function(req, res){
    // res.redirect("http://localhost:3000/homepage");
})



module.exports = router;