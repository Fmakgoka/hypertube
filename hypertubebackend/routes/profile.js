var express = require('express');
var router = express.Router();
var sql = require('../query/query');
const authJWT = require('../middleware/authJWT');
const bcrypt = require('bcrypt');
const saltRound = 10;
const mail = require('../middleware/emailmassege');
const multer = require('multer');
var upload = require('../middleware/imageupload');


router.get('/', [authJWT.verifyToken], function (req, res) {
    console.log(req.userId)
    res.redirect("http://localhost:3000/profile");
})

router.post('/', [authJWT.verifyToken], async function (req, res) {
    console.log('here', authJWT)
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var email = req.body.email;
    var oldpassword = req.body.oldpassword;
    var newpassword = req.body.newpassword;
    var confirm = req.body.confirm;
    var user_id = req.userId
    console.log('lets see', req.userId)
    try {
        upload(req, res, async (err) => {

            if (err instanceof multer.MulterError) {
                res.render('/profile', {
                    error: {
                        message: "An error occured uploading your images`",
                    }
                })
            } else if (err) {
                res.send(err);
            } else {
                var image = req.file;
                console.log(image);
                await sql.UpdateImage(image.filename, user_id)
            }
        })

        console.log('first')
        if (firstname != '') {
            console.log('firstname')
            await sql.updateFirstname(firstname, user_id);
            res.send(200)
        }
        if (lastname != '') {
            console.log('lastname')
            await sql.updateLastName(lastname, user_id);
            res.send(200)

        }
        if (username != '') {
            console.log('username')
            var check = await sql.checkUserNameExists(username);
            if (check.length != 0) {
                res.send(401);
                res.end()
            } else {
                await sql.updateUserName(username, user_id)
                res.send(200)
            }
        }
        if (email != '') {
            console.log('email')
            var check = await sql.checkEmailExists(email);
            if (check.length != 0) {
                res.send(401);
                res.end()
            } else {
                console.log('email in here')
                await sql.updateEmail(email, user_id)
                console.log('send email in here')
                await mail.emailchange(email)
                res.send(200)

            }
        }
        if (oldpassword != '' && newpassword != '' && confirm != '') {

            var checking = await sql.checkUserId(user_id);
            var compare = await sql.comparePassword(oldpassword, checking[0].password)
            if (compare) {
                if (newpassword == confirm) {
                    let newPassword = await bcrypt.hash(newpassword, saltRound);
                    await sql.updateUserPassword(newPassword, user_id)
                    res.send(200)
                } else {
                    console.log('new not = confirm')
                    res.send(401);
                    res.end()
                }
            } else {
                console.log('oldpassword not match')
                res.send(401);
                res.end()
            }
        }
        // if (oldpassword == '' || newpassword == '' || confirm == '') {
        //     res.send(400);
        //     res.end()
        // }
        console.log('end')
        //res.send(200);
        res.end()
    } catch (error) {
        console.log("error updating ", error.message);


    }
})

module.exports = router;