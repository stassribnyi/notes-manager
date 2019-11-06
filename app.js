const chalk = require('chalk');

const notes = require('./notes');

const { log } = console;

const command = process.argv[2];

switch (command) {
  case 'add':
    log('Adding note...');

    break;
  case 'remove':
    log('Removing note...');
    break;

  default:
    break;
}
