const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Note, NoteBackup} = require('../models/Note');
const { ensureAuthenticated , ensureAccountOwnsNote} = require('../config/auth');
mongoose.set('useFindAndModify', false);


//if the request ./note/ just redirect them back to home
router.get('/', function (req, res, next) {
    res.redirect('/');
});

// post method for adding a node to the database
router.post('/add',ensureAuthenticated, function (req, res, next) {
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
                        res.redirect("/");
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
            console.log("deleted successful")
            res.redirect('/home');
        }
    });
});
//the get method for editing a note
// /note/edit/<id>
router.get('/edit/:id',ensureAuthenticated, ensureAccountOwnsNote,  function (req, res, next) {
    const id = req.params.id;
    Note.findOne({ _id: id }, (err, nt) => {
        if (err) {
            console.log("did not find a note");
            res.redirect('/');
        } else {
            console.log("found note");
            console.log(nt);
            console.log(typeof (nt));
            //render the edit note page with the note 
            res.render('pages/editNote', { note: nt, user: req.user,});
        }
    });
});
// post method for updating a note
// /note/edit/<id>
router.post('/edit/:id', ensureAuthenticated, ensureAccountOwnsNote, function (req, res, next) {
    console.log("we got a post request");
    const newNotes = JSON.parse(req.body.notes)
    const id = req.params.id;
    const newTitle = req.body.title;

    //find the Note in the database and update it with the edited content
    Note.findOneAndUpdate({ _id: id }, { list_content: newNotes, title: newTitle }, { upsert: true }, function (err, doc) {
        if (err) {
            console.log("error in updating");
        } else {
            console.log("updated");
            res.redirect('/');
        }
    });
});
module.exports = router;