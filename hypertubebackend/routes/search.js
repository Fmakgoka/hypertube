var express = require('express');
var router = express.Router();
const axios = require('axios');
const { authJWT } = require('../middleware')


router.get('/', [authJWT.verifyToken], function (req, res) {


    var searchvalue = req.query.q;
    if (searchvalue.length !== 0) {
        axios({
            "method": "GET",
            "url": `https://yts.mx/api/v2/list_movies.json?query_term=${searchvalue}`,
            "mode": "no-cors",
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                console.log('response from search', response.data)
                res.json({ data: JSON.stringify(response.data) });
            })
            .catch((error) => {
                console.log(error)
            })
        console.log('in search')
        axios({
            "method": "GET",
            "url": `https://yts.mx/api/v2/list_movies.json?query_term=${searchvalue}`,
            "mode": "no-cors",
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
               console.log('response from search',response.data)
              res.json({ data: JSON.stringify(response.data) });
            })
            .catch((error) => {
                console.log(error)
            })
        console.log('in search')
 axios({
        "method": "GET",
        "url": `https://yts.mx/api/v2/list_movies.json?query_term=${searchvalue}`,
        "mode": "no-cors",
        "headers": {
            "content-type": "application/json",
        }
    })
        .then((response) => {
           console.log('response from search',response.data)
          res.json({ data: JSON.stringify(response.data) });
        })
        .catch((error) => {
            console.log(error)
        })
    console.log('in search')
    
    }

})


module.exports = router;