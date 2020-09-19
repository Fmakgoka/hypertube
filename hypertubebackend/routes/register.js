var express = require('express');
var router = express.Router();
var sql = require('../query/query');
var bcrypt = require('bcrypt');
const saltRound = 10;
var crypto = require('crypto');
var nodemailer = require("nodemailer");


router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/', async function (req, res) {
    var username = req.body.username
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var confirm = req.body.confirm;
    console.log(username)
    if (!username || !firstname || !lastname || !email || !password || !confirm) {
        res.send(401);
        res.end();
    } else {
        console.log('in post')
        emailExists = false;
        usernameExists = false;
        try {
            console.log('in try')
            var check = await sql.checkEmailAndUserNameExists(username, email);
            console.log(check)
            check.forEach(element => {
                console.log('in check')
                if (email == element.email) {
                    console.log('elementemail')
                    emailExists = true;
                }
                console.log(element.username)
                console.log(username)
                if (username == element.username) {
                    console.log('username')
                    usernameExists = true;
                }
            });
            if (usernameExists == false && emailExists == false) {
                console.log('in if')
                if (password == confirm) {
                    console.log('in password')
                    let newPassword = await bcrypt.hash(password, saltRound);
                    var token = crypto.randomBytes(64).toString('base64');
                    console.log(token)
                     await sql.insertUserD(username, firstname, lastname, email, newPassword, token);
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'phyliciadancer@gmail.com',
                            pass: 'Abcd@1234'
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
                    token = encodeURIComponent(token)

                    var mailOptions = {
                        from: '  ',
                        to: email,
                        subject: 'ActivateAccount',
                        text: 'That was not that easy!',
                        html: `<p>activate your account</p>
                            <a href = 'http://localhost:9000/activateAccount/?token=${token}'>here</a>`

                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log("email doesn't exists");
                            res.send(401);
                            res.end()
                        } else {

                            console.log('Email sent: ' + info.response);
                        }
                    })
                    console.log('inserted')
                    res.send(200);
                    res.end()

                }
            }

        } catch (error) {
            console.log("error register ", error.message);
            res.redirect('/');
        }
    }
})


module.exports = router;