const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Note = require('../models/Note').Note;


/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("get request on /");
  Note.find({}, (err, nts) => {
    if (err) {
      console.log(err);
      res.send("Server Error");
    } else {
      //array of notes
      res.render('pages/index', { notes: nts });
    }
  });
});
module.exports = router;