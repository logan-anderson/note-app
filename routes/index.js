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
var Note = mongoose.model("Note", noteSchema);


/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("get request on /");
  var n = [
    {
      'title': "Logans Note",
      'content': ['Note one', 'note two'],
    },
    {
      'title': "Maddie Note",
      'content': ['Note one', 'note two'],
    },
    {
      'title': "Katie Note",
      'content': ['Note one', 'nothttps://www.logananderson.ca/e two'],
    },
  ];
  Note.find({}, (err, nts) => {
    if (err) {
      console.log(err);
      res.render('pages/index', { notes: n });
    } else {
      //array of notes
      // console.log(nts);
      res.render('pages/index', { notes: nts });
    }
  });
  // res.render('pages/about');
});

module.exports = router;
