const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Note = require('../models/Note').Note;


/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("get request on /");
  console.log(req.user || 'no user logged in' );
  if(req.user){
    console.log(req.user._id)
  }
  Note.find({}, (err, nts) => {
    if (err) {
      console.log(err);
      res.send("Server Error");
    } else {
      //array of notes
      res.render('pages/index', { notes: nts, user : req.user });
    }
  });
});
module.exports = router;