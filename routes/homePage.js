const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Note = require('../models/Note').Note;

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  Note.find({})
    .then((nts) => {
      res.render('pages/home', { name: req.user.name, notes: nts , user: req.user});
    })
    .catch(err=>{
      console.log(err)
    });

});

module.exports = router;