const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes');

const { log } = console;

const addCommand = (command, describe, handler) =>
  yargs.command({
    command,
    describe,
    handler
  });

addCommand('add', 'Add a new note', () => {
  log('Adding a new note!');
});

addCommand('remove', 'Remove a note', () => {
  log('Removing a note!');
});

addCommand('list', 'List all notes', () => {
  log('Listing up all notes!');
});

addCommand('read', 'Read a specific note', ({ id }) => {
  log(`Reading a note with id: ${id}!`);
});

log(yargs.argv);
