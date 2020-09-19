var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
//var con = require("../model/connection");
var sql = require('../query/query');
const saltRound = 10;
var email;
var token;

/*get*/
router.get("/", function (req, res) {
    console.log('in here password')
  email = req.query.email;
  token = decodeURIComponent(req.query.token);
  if (email && token) {
      console.log(token)
    res.redirect("http://localhost:3000/password");
} else {
    res.redirect("http://localhost:3000/forgotpassword");
}
  res.end();
});

//console.log('token'+token);

router.post("/", async function (req, res) {
  var password = req.body.password;
  var confirm = req.body.confirm;
  console.log(token)
  if (!password || !confirm) {
    res.send(401);
        res.end();
  } else {
    if (password === confirm) {
        console.log('if password are the same')
      try {
          console.log('we are try')
        let newPassword = await bcrypt.hash(password, saltRound);
        console.log(token)
        let user = await sql.findUserByToken(token);
        console.log(user)
        user = user[0];
        await sql.updateUserPassword(newPassword, user.username);
        res.send(200);
        res.end();
      } catch (error) {
        console.log("error updating password ", error.message);
        res.send(401);
        res.end();
      }
    }
  }
});

module.exports = router;