const express = require('express');

const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { Note } = require('../models/Note');

/* GET home page. */
// TODO: refactor the yucky nested database queries
router.get('/', ensureAuthenticated, (req, res, next) => {
  Note.find({ owner: req.user._id })
    .then((userNotes) => {
      Note.find({ public: true })
        .then((publicNotes) => {
          res.render('pages/home', {
            name: req.user.name,
            userNotes,
            publicNotes,
            user: req.user,
          });
        })
        .catch((err) => {
          console.log(err);
          req.flash('error_msg', 'Database error');
          res.redirect('/home');
        });
    })
    .catch((err) => {
      console.log(err);
      req.flash('error_msg', 'Database error');
      res.redirect('/home');
    });
});

module.exports = router;
