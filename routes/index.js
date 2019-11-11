var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
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
      'content': ['Note one', 'note two'],
    },
  ]
  res.render('pages/index', { notes: n });
});

module.exports = router;
