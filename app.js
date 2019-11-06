const validator = require('validator');
const chalk = require('chalk');

const notes = require('./notes');

const { log } = console;

log(chalk.bgWhiteBright(notes.getNotes()));
log(chalk.green(validator.isEmail('stas@sribnyi.com')));
log(chalk.red(validator.isEmail('stas.sribnyi.com')));
log(chalk.blue(validator.isURL('https://test.io')));
log(chalk.magenta(validator.isURL('https://testio')));
