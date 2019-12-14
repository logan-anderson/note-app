const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const Note = mongoose.model('Note');
const NoteBackup = mongoose.model("NoteBackup");


router.get('/', (req, res, render)=>{
    console.log("we here");
    res.render('pages/account');
})

//if the request ./account/login
router.get('/login', (req, res, next)=>{
    res.render('pages/login');
});

//if the request ./account/register
router.get('/register', (req, res, next)=>{
    console.log("got here");

    res.render('pages/register');
});

module.exports = router;