const fs = require('fs');

const NOTES_PATH = './notes.json';

const getNotes = callback => {
  fs.readFile(NOTES_PATH, (err, buffer) => {
    if (err && err.code === 'ENOENT') {
      callback([]);

      return;
    }

    const notesJSON = buffer.toString();
    const notes = notesJSON ? JSON.parse(notesJSON) : [];

    callback(notes);
  });
};

const addNote = (title, body, callback) => {
  getNotes(notes => {
    const newNote = { title, body };
    const newNotes = [...notes, newNote];

    fs.writeFile(NOTES_PATH, JSON.stringify(newNotes), err => {
      if (!err) {
        callback(newNote);

        return;
      }

      console.log('An error occurred while adding a note!');
    });
  });
};

module.exports = {
  getNotes,
  addNote
};
