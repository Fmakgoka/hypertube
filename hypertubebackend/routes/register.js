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
    if (!username || !firstname || !lastname || !email || !password || !confirm) {
        res.status(401).send({
            message: "user does not exist",
            accessToken: null
        });
        res.end()
    } else {
        emailExists = false;
        usernameExists = false;
        try {
            var check = await sql.checkEmailAndUserNameExists(username, email);
            check.forEach(element => {
                if (email == element.email) {
                    emailExists = true;
                }
                if (username == element.username) {
                    usernameExists = true;
                }
            });
            if (usernameExists == false && emailExists == false) {
                if (password == confirm) {
                    let newPassword = await bcrypt.hash(password, saltRound);
                    var token = crypto.randomBytes(64).toString('base64');
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
                            res.status(401).send({
                                message: "Email does not exist",
                                accessToken: null
                            });
                            res.end()
                        } else {

                            console.log('Email sent: ' + info.response);
                        }
                    })
                    res.send({message:"User was registered successfully"});
                    res.end()

                }
            }else{
                res.status(401).send({
                    message: "username/email already exist",
                    accessToken: null
                });
                res.end()
            }

        } catch (error) {
            console.log("error register ", error.message);
            res.status(500).send({ message: err.message });
        }
    }
})


module.exports = router;