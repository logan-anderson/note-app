const mongoose = require('mongoose');
const { Note } = require('../models/Note');
const Account = require('../models/Account');

module.exports = {
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please login to view this resource');
    res.redirect('/account/login');
    return null;
  },
  ensureAccountOwnsNote(req, res, next) {
    const noteId = req.params.id;


    // get he note and make sure it belongs to that user

    Note.findById(noteId)
      .then((note) => {
        console.log(req.user._id);
        console.log(note.owner);
        console.log(typeof note.owner);
        console.log(typeof req.user._id);
        const { owner } = note;
        const userID = req.user._id;

        // Does the note belong to the user?
        if (owner.equals(userID)) {
          console.log('this is your note!');
          return next();
        }
        req.flash('error_msg', 'Sorry you can only edit or delete notes that you own');
        res.redirect('/home');
        return null;
      })
      .catch((err) => {
        console.log(err);
        req.flash('error_msg', 'Note does not exist');
        res.redirect('/home');
        return null;
      });
  },
};
