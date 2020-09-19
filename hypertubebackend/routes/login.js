var express = require('express');
var router = express.Router();
var sql = require('../query/query')
var bcrypt = require('bcrypt')

  router.get('/', function (req, res) {
    res.render('login');
  });

router.post('/', async function (req, res) {
    
     var username = req.body.username;
     var password = req.body.password;
     if (!username || !password) {
         res.send(401);
         res.end()
     } else {
         console.log('login')
         usernameExists = false
         var check = await sql.checkUserNameExists(username);
         console.log(check)
         if (check.length == 0) {
             console.log('in check')
             res.send(401);
             res.end()
         } else {
             bcrypt.compare(password, check[0].password, function (err, result) {
                 if (result == true) {
                     var verify;
                     check.forEach(element => {
                         if (username == element.username) {
                             usernameExists = true;
                             req.session.GetId = check[0].user_id;
                             req.session.user = check[0]
                             verify = check[0].verify;
                             }
                         })
                         if (usernameExists == true && verify == 'yes') {
                            req.session.username = username;
                            req.session.login = true;
                            res.send(200);
                            res.end()
                           
                           }
                     }
                 })

         }

     }
}
)




module.exports = router;