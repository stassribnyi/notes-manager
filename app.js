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

addCommand(
  'add',
  'Add a new note',
  ({ title, body }) => {
    log(`Adding a new note...\nTitle: ${title}\nBody: ${body}`);
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

addCommand('list', 'List all notes', () => {
  log('Listing up all notes!');
});

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
