const fs = require('fs');
const chalk = require('chalk');

const NOTES_PATH = './notes.json';

const { log } = console;
const errorMsg = message => log(chalk.bgRedBright(message));

const getNotes = callback => {
  fs.readFile(NOTES_PATH, (err, buffer) => {
    if (err && err.code === 'ENOENT') {
      callback([]);

      return;
    }
    if (err) {
      errorMsg('An error occurred while reading notes!');

      return;
    }

    const notesJSON = buffer.toString();
    const notes = notesJSON ? JSON.parse(notesJSON) : [];

    callback(notes);
  });
};

const findNoteByTitle = (notes, title) =>
  notes.find(note => note.title.toLowerCase() === title.toLowerCase());

const saveNotes = (notes, callback) => {
  fs.writeFile(NOTES_PATH, JSON.stringify(notes), err => {
    if (!err) {
      callback();

      return;
    }

    errorMsg('An error occurred while saving changes!');
  });
};

const addNote = (title, body, callback) => {
  getNotes(notes => {
    const newNote = { title, body };

    if (findNoteByTitle(notes, title)) {
      errorMsg('Note with same title already exists!');

      return;
    }

    const newNotes = [...notes, newNote];

    saveNotes(newNotes, callback);
  });
};

const readNote = (title, callback) => {
  getNotes(notes => callback(findNoteByTitle(notes, title)));
};

const removeNote = (title, callback) => {
  getNotes(notes => {
    const noteToRemove = findNoteByTitle(notes, title);

    if (!noteToRemove) {
      errorMsg('A note with specified title does not exists!');

      return;
    }

    const newNotes = notes.filter(note => note !== noteToRemove);

    saveNotes(newNotes, callback);
  });
};

module.exports = {
  getNotes,
  addNote,
  readNote,
  removeNote
};
