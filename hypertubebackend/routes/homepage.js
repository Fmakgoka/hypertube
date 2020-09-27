var express = require('express');
const { NotExtended } = require('http-errors');
var router = express.Router();
const {authJWT}= require('../middleware')
const axios =require('axios')

const authCheck = function(req, res, next){
    if(!req.user){
        console.log('not auth')
        res.redirect("http://localhost:3000/login");

    }else{
        next()
    }
}

router.get('/' ,[authJWT.verifyToken],function(req, res){
    console.log('in movi') 
    axios({
        "method":"GET",
        "url":"https://yts.mx/api/v2/list_movies.json",
        "mode":"no-cors",
        "headers":{
        "content-type":"application/json",
        // "Access-Control-Allow-Origin":"*",
        // "Access-Control-Allow-Credentials":true,
        // "x-rapidapi-host":"yts-am-torrent.p.rapidapi.com",
        // "x-rapidapi-key":"a5d8a94498mshd67f9042440cd45p13f7f2jsne815b97b768f",
        // "useQueryString":true
        }
        })
        .then((response)=>{
          //  response.json()
          // console.log(response.data)
          // res.send(response)
          res.json({ data: JSON.stringify(response.data) });
        })
        .catch((error)=>{
          console.log(error)
        })
        console.log('in movie')
        // res.redirect("http://localhost:3000/homepage");
})



module.exports = router;