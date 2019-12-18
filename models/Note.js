const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    note_content: String,
    list_content: Array,
    title: String,
})
const noteSchema_backup = new mongoose.Schema({
    note_content: String,
    list_content: Array,
    title: String,
})
const Note = mongoose.model("Note", noteSchema);
const NoteBackup = mongoose.model("NoteBackup", noteSchema_backup);

module.exports = {
    Note,
    NoteBackup,
};