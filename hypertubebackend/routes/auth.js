var express = require('express')
const router = express.Router()
const passport = require('passport');
var jwt = require("jsonwebtoken");
const key = require('../model/key')


router.get('/intra', passport.authenticate('42', {
    scope: []
}))

router.get('/github', passport.authenticate('github', {
    scope: ['profile'],
})
)

router.get('/logout', function(req, res){
    req.logOut();
    res.redirect("http://localhost:3000/logout");
})

router.get('/intra/redirect', passport.authenticate('42'),(req, res) =>{
    res.redirect('/homepage')
})

router.get('/github/redirect', passport.authenticate('github'),(req, res) =>{
    console.log('redirected', req.user)
    const token = jwt.sign({ id: req.user }, key.jwt.secret, {
        expiresIn: 86400 // 24 hours
    });
    res.cookie('jwt', token)
    res.redirect('/homepage')
})
module.exports = router