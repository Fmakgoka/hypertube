var express = require('express');
const updating = require('./password');
var router = express.Router();
var updatepassword = require('./password')

router.get("/", function (req, res) {
    email = req.query.email;
    token = decodeURIComponent(req.query.token);
    if (email && token) {
      res.redirect("http://localhost:3000/password");
    } else {
      res.redirect("http://localhost:3000/forgotpassword");
    }
    res.end();
  });

  router.post('/', updating.updatePassword)