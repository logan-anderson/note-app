var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var Note = mongoose.model('Note');
var NoteBackup = mongoose.model("NoteBackup");


//if the request ./account/register
router.get('/login', function (req, res, next) {
    console.log("got here");

    res.render('pages/login');
});

//if the request ./account/register
router.get('/register', function (req, res, next) {
    console.log("got here");

    res.render('pages/register');
});

module.exports = router;