const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes');

const { log } = console;

const addCommand = (command, describe, handler, builder = {}) =>
  yargs.command({
    command,
    describe,
    handler,
    builder
  });

const logNote = note => {
  log(chalk.bgWhiteBright(`${note.title}\n${note.body}`));
  log('_______________________________________________');
};

addCommand(
  'add',
  'Add a new note',
  ({ title, body }) => {
    notes.addNote(title, body, note => {
      log(chalk.bgGreenBright('Note has been added!'));
    });
  },
  {
    title: {
      describe: 'A note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'A note body',
      demandOption: true,
      type: 'string'
    }
  }
);

addCommand(
  'remove',
  'Remove a note',
  () => {
    log('Removing a note!');
  },
  {
    id: {
      describe: 'An id of a note',
      demandOption: true,
      type: 'number'
    }
  }
);

addCommand('list', 'List all notes', () =>
  notes.getNotes(notes => {
    log(chalk.green(notes.length ? 'Notes:' : 'No notes'));
    notes.forEach(logNote);
  })
);

addCommand(
  'read',
  'Read a specific note',
  ({ id }) => {
    log(`Reading a note with id: ${id}!`);
  },
  {
    id: {
      describe: 'An id of a note',
      demandOption: true,
      type: 'number'
    }
  }
);

yargs.parse();
