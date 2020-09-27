const passport = require('passport');
const intraStrategy = require('passport-42');
const githubStrategy = require('passport-github')
var sql = require('../query/query')
var jwt = require("jsonwebtoken");


const key  = require('./key')

passport.serializeUser((user, done) =>{
  ///  console.log('In serializedc' +user.user_id)
    done(null, user);
})

passport.deserializeUser( async function(id, done){
    try {
        var check = await sql.checkUserId(id)
        ///console.log('in deserialized '+check[0])
        done(null, check[0])
    } catch (error) {
        console.log("error register ", error.message);

    }
})

passport.use(
    new intraStrategy({
        clientID: key.intra.clientID,
        clientSecret: key.intra.clientSecret,
       callbackURL:"/auth/intra/redirect"
    }, async function(accessToken, refreshToken, profile, done){
        try {
            var check = await sql.checkUserNameExists(profile. username)
            if (check.length == 0){
               var insert = await sql.insertAuth(profile.username, profile.displayName)
               done(null, insert[0])
            }else{
                //console.log('exists' +check[0]);
                done(null, check[0]);
            }
        } catch (error) {
            console.log("error register ", error.message);
        }
    })
)

passport.use(
    new githubStrategy ({
        clientID: key.github.clientID,
        clientSecret: key.github.clientSecret,
       callbackURL:"/auth/github/redirect"
    }, async function(accessToken, refreshToken, profile, done) {
        try {
            var check = await sql.checkUserNameExists(profile. username)
            if (check.length == 0){
                var insert = await sql.insertAuth(profile.username, profile.displayName)
               
                
                done(null, insert[0])
            }else{
                
                console.log('exists' +check[0]);
                done(null, check[0]);
            }
            
        } catch (error) {
            console.log("error register ", error.message);
        }
    })
)
//  