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
        res.status("401");
        res.end();
    }
    else {
        emailExist = false;
        try {
            console.log('in try me jjiu')
            var check = await sql.checkEmailExists(email);
            console.log(check)
            check.forEach(element => {
                console.log('in check')
                if (email == element.email) {
                    console.log('elementemail')
                    emailExist = true;
                }
            });
            console.log(emailExist)
            if (emailExist == true) {
                console.log('in true')
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
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);

                    }
                })
            }
        } catch (error) {
            console.log("error register ", error.message);


        }
    }
})

module.exports = router;