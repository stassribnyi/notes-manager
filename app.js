const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes');

const { log } = console;

const successMsg = message => log(chalk.bgGreenBright(message));
const greenMsg = message => log(chalk.green(message));

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
  ({ title, body }) =>
    notes.addNote(title, body, () => successMsg('Note has been added!')),
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
  ({ title }) =>
    notes.removeNote(title, () => successMsg('Note has been removed!')),
  {
    title: {
      describe: 'A title of a note',
      demandOption: true,
      type: 'string'
    }
  }
);

addCommand('list', 'List all notes', () =>
  notes.getNotes(notes => {
    greenMsg(notes.length ? 'Notes:' : 'No notes found');

    notes.forEach(logNote);
  })
);

addCommand(
  'read',
  'Read a specific note',
  ({ title }) =>
    notes.readNote(title, note => {
      greenMsg(note ? 'Note:' : 'No note found');

      note && logNote(note);
    }),
  {
    title: {
      describe: 'A title of a note',
      demandOption: true,
      type: 'string'
    }
  }
);

yargs.parse();
