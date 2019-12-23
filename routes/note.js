const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Note, NoteBackup } = require('../models/Note');
const { ensureAuthenticated, ensureAccountOwnsNote } = require('../config/auth');
mongoose.set('useFindAndModify', false);


//if the request ./note/ just redirect them back to home
router.get('/', function (req, res, next) {
    res.redirect('/');
});

// post method for adding a node to the database
router.post('/add', ensureAuthenticated, function (req, res, next) {
    console.log(req.body.title);
    console.log(req.body.notes);
    if (req.body.title && req.body.notes) {
        // make a backup note
        NoteBackup.create({
            note_id: 1,
            list_content: JSON.parse(req.body.notes),
            title: req.body.title,
            owner: req.user._id,
        }, (err, note) => {
            //call back function
            if (err) {
                console.log("Something went wrong");
            } else {
                console.log("We saved a note to the db");
                // make the real note
                Note.create({
                    note_id: 1,
                    list_content: JSON.parse(req.body.notes),
                    title: req.body.title,
                    owner: req.user._id,
                }, (err, note) => {
                    //call back function
                    if (err) {
                        console.log("Something went wrong");
                        res.send("Server error");
                    } else {
                        console.log("We saved a note to the db");
                        //redirect to where they were
                        res.redirect('/home');
                    }
                });
            }
        });
        console.log("not good");
    } else {
        console.log("got nothing!");
        res.redirect('/');
    }
});
// post method for deleting a note from the database  /note/delete/<id of the note>
// the id of the note is encoded in the front end 
router.post('/delete/:id', ensureAuthenticated, ensureAccountOwnsNote, function (req, res, next) {
    console.log("we got a post request");
    const id = req.params.id;
    Note.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log("did not delete");
            res.redirect('/');
        } else {
            //redirect to where they were
            res.redirect('/home');
        }
    });
});
//the get method for editing a note
// /note/edit/<id>
router.get('/edit/:id', ensureAuthenticated, ensureAccountOwnsNote, function (req, res, next) {
    const id = req.params.id;
    Note.findOne({ _id: id }, (err, note) => {
        if (err) {
            console.log("did not find a note");
            res.redirect('/');
        } else {
            console.log("found note");
            console.log(note);
            //render the edit note page with the note 
            res.render('pages/editNote', { note, user: req.user, });
        }
    });
});
// post method for updating a note
// /note/edit/<id>
router.post('/edit/:id', ensureAuthenticated, ensureAccountOwnsNote, function (req, res, next) {
    console.log("we got a post request from " + req.baseUrl);
    const newNotes = JSON.parse(req.body.notes);
    const public = Boolean(req.body.public);
    console.log(public);
    const id = req.params.id;
    const title = req.body.title;

    //find the Note in the database and update it with the edited content
    Note.findOneAndUpdate({ _id: id }, { list_content: newNotes, title, public, }, { upsert: true }, function (err, newNote) {
        if (err) {
            console.log("error in updating");
        } else {
            //redirect to where they were
            console.log("this is the new note");
            console.log(newNote);
            res.redirect('/home');
        }
    });
});
module.exports = router;