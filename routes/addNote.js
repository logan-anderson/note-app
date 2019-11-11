var express = require('express');
var router = express.Router();
var fs = require('fs');
const { exec } = require('child_process');

/* GET home page. */
router.get('/', function (req, res, next) {
    // try {
    //     var data = fs.readFileSync('public/text.txt', 'utf8');
    //     console.log(data.toString());
    // } catch (e) {
    //     console.log('Error:', e.stack);
    // }
    console.log("we got a note");
    res.render('pages/index');
});

module.exports = router;