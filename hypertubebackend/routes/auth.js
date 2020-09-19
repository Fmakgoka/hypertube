var express = require('express')
const router = express.Router()
const passport = require('passport');

router.get('/intra', passport.authenticate('42', {
    scope: []
}))

router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}))

router.get('/logout', function(req, res){
    req.logOut();
    res.redirect("http://localhost:3000/logout");
})

router.get('/intra/redirect', passport.authenticate('42'),(req, res) =>{
    res.redirect('/homepage')
})

router.get('/github/redirect', passport.authenticate('github'),(req, res) =>{
    res.redirect('/homepage')
})
module.exports = router