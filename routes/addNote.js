var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("we got a note");
    res.render('pages/index');
});

module.exports = router;