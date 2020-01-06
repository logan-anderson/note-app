const swearjar = require('swearjar');

function hasBadWords(title, notes) {
  if (swearjar.profane(title)) {
    return true;
  }
  let hasBad = false;
  notes.foreach((word) => {
    if (swearjar.profane(word)) {
      hasBad = true;
    }
  });
  return hasBad;
}
module.exports = {
  hasBadWords,
};
