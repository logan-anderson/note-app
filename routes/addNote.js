var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/notes_db", { useNewUrlParser: true, useUnifiedTopology: true });

var noteSchema = new mongoose.Schema({
    note_id: Number,
    note_content: String,
    list_content: Array,
})

var Note = mongoose.model("Note", noteSchema);

router.get('/', function (req, res, next) {

    //creat a note in the database
    Note.create({
        note_id: 2,
        note_content: "This is a note in the database",
        list_content: ["this is a note", "so is this"],
    }, (err, note) => {
        //call back function
        if (err) {
            console.log("Something went wrong")
        } else {
            console.log("We saved a note to the db");
            console.log(note);
        }
    });

    //get notes from database
    Note.find({}, (err, notes) => {
        if (err) {
            console.log(err);
        } else {
            //array of notes
            console.log(notes);
        }
    });


    console.log("we get a got a note");
    res.render('pages/index');
});
router.post('/', function (req, res, next) {
    // try {
    //     var data = fs.readFileSync('public/text.txt', 'utf8');
    //     console.log(data.toString());
    // } catch (e) {
    //     console.log('Error:', e.stack);
    // }
    console.log("we got a post request");
    res.render('pages/index');
});

module.exports = router;