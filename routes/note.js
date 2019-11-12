var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Note = mongoose.model('Note');

router.get('/', function (req, res, next) {
    // creat a note in the database
    Note.create({
        note_id: 2,
        list_content: ["this is a note", "so is this"],
        title: "DB Note",
    }, (err, note) => {
        //call back function
        if (err) {
            console.log("Something went wrong");
            res.send("Server error");
        } else {
            console.log("We saved a note to the db");
            // console.log(note);
            // get all the notes
            Note.find({}, (err, nts) => {
                if (err) {
                    console.log(err);
                } else {
                    //array of notes
                    console.log(nts);
                    ///send back the main page
                    res.render('pages/index', { notes: nts });
                }
            });
        }
    });
});
router.post('/add', function (req, res, next) {
    console.log("we got a post request");
    console.log(req.body.title);
    console.log(req.body.notes);
    if (req.body.title && req.body.notes) {
        Note.create({
            note_id: 1,
            list_content: JSON.parse(req.body.notes),
            title: req.body.title,
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
router.post('/delete/:id', function (req, res, next) {
    console.log("we got a post request");
    var id = req.params.id;
    console.log(id);
    Note.deleteOne({_id:id},(err)=>{
        if(err) {
            console.log("did not delete");
            res.redirect('/');
        } else {
            console.log("deleted successful")
            res.redirect('/');
        }
    });
    // res.redirect('/');
});

module.exports = router;