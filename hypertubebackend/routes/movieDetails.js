var express = require('express');
var router = express.Router();
const axios = require('axios');
const { authJWT } = require('../middleware')

router.get('/', [authJWT.verifyToken], function (req, res) {
    var id = req.query.id;
   
    axios({
        "method": "GET",
        "url": `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`,
        "mode": "no-cors",
        "headers": {
            "content-type": "application/json",
        }
    })
        .then((response) => {
            res.json({ data: JSON.stringify(response.data) });
        })
        .catch((error) => {
            console.log(error)
        })

})
    
module.exports = router