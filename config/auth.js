const mongoose = require('mongoose');
const Note = require('../models/Note').Note;
const Account = require('../models/Account');
module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please login to view this resource');
        res.redirect('/account/login');
    },
    ensureAccountOwnsNote: function (req, res, next) {
        const noteId = req.params.id;
        console.log('the note id is, ' + noteId);
        console.log('the user ID is, ' + req.user._id);

        //get he note and make sure it belongs to that user

        Note.findById(noteId)
            .then(note => {
                console.log(note);
                // Does the note belong to the user? 
                if (note.owner == req.user._id) {
                    return next();
                } else {
                    req.flash('error_msg', 'Sorry you can only edit or delete notes that you own');
                    res.redirect('/home');
                }
            })
            .catch(err => {
                console.log(err);
                req.flash('error_msg', 'Note does not exist');
                res.redirect('/home');
            });

    }
}