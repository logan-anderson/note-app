var express = require('express');
var router = express.Router();

// var mongoose = require("mongoose");
//db stuff



var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/notes_db", { useNewUrlParser: true, useUnifiedTopology: true });

var noteSchema = new mongoose.Schema({
  note_id: Number,
  note_content: String,
  list_content: Array,
  title: String,
})
var noteSchema_backup = new mongoose.Schema({
  note_id: Number,
  note_content: String,
  list_content: Array,
  title: String,
})
var Note = mongoose.model("Note", noteSchema);
var NoteBackup = mongoose.model("NoteBackup", noteSchema_backup);


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