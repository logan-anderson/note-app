const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    note_content: String,
    list_content: Array,
    title: {
        type: String,
        required: true,
    },
    public: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateLastModified: {
        type: Date,
        default: Date.now,
    },
})
const Note = mongoose.model("Note", noteSchema);
const NoteBackup = mongoose.model("NoteBackup", noteSchema);

module.exports = {
    Note,
    NoteBackup,
};