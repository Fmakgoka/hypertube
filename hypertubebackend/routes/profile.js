var express = require('express');
var router = express.Router();
const session = require('express-session')
var sql = require('../query/query')
const authJWT= require('../middleware/authJWT');
var bcrypt = require('bcrypt')
const { checkUserNameExists } = require('../query/query');


router.get('/', [authJWT.verifyToken], function(req, res){
    console.log(req.userId)
    res.redirect("http://localhost:3000/profile");
})

router.post('/',[authJWT.verifyToken], async function(req, res){
    console.log('here',authJWT)
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var user_id = req.userId
    console.log('lets see',req.userId)
    try {
        if (firstname != ''){
            await sql.updateFirstname(firstname, user_id);
            res.send(200);
            res.end()
        }
        if (lastname != ''){
            await sql.updateLastName(lastname, user_id);
            res.send(200);
            res.end()
        }
        if(username != ''){
            var check = await sql.checkUserNameExists(username);
            if (check){
                res.send(400);
                res.end()
            }else{
                await sql.updateUserName(username, user_id)
            }
        }
        if (email != ''){
            var check = await sql.checkEmailExists(email);
            if(check){
                res.send(400);
                res.end()
            }else{
                await sql.updateEmail(email, user_id)
            }
        }
        if (password != ''){
            var check = await sql.checkUserId(user_id);
            if (check){
                bcrypt.compare(password, check[0].password, function (err, result) {
                    if (result == true){
                        
                    }
                })
            }

        }
    } catch (error) {
        console.log("error register ", error.message);
 
        
    }
})

module.exports = router;