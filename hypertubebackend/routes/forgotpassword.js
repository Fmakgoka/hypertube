var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var sql = require('../query/query')
var nodemailer = require("nodemailer");


router.get('/', function (req, res) {
    res.render('forgotpassword');
});

router.post('/', async function (req, res) {
    var email = req.body.email;
    if (!email) {
        res.status(401).send({
            message: "email does not exist",
            accessToken: null
        });
        res.end()
    }
    else {
        emailExist = false;
        try {
            var check = await sql.checkEmailExists(email);
            check.forEach(element => {
                if (email == element.email) {
                    emailExist = true;
                }
            });
            if (emailExist == true) {
                var token = crypto.randomBytes(64).toString('base64');
                 await sql.updateToken(token, email);
                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
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
                    from: 'phyliciadancer@gmail.com',
                    to: email,
                    subject: 'forgot Password',
                    text: `To reset your password, please click the link below.`,
                    html: `<p>change your password</p>
                            <a href = 'http://localhost:9000/password/?token=${token}&email=${email}'>here</a>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("email doesn't exists");
                        res.status(401).send({
                            message: "user does not exist",
                            accessToken: null
                        });
                        res.end();
                     } else {
                        console.log('Email sent: ' + info.response);
                        res.status(200).send({
                            message: "check your email",
                            accessToken: null
                        });

                    }
                })
            }else{
                res.status(401).send({
                    message: "email not exist",
                    accessToken: null
                });
                res.end()
            }
        } catch (error) {
            console.log("error register ", error.message);


        }
    }
})

module.exports = router;