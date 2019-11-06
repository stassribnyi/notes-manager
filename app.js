const utils = require('./utils');
const notes = require('./notes');

const a = 235.2345;
const b = 432.231;
const c = utils.add(a, b);

console.log(`Hi, ${utils.name}`);
console.log(`${a} + ${b} = ${c}`);
console.log(`Getting your notes...`);
console.log(notes.getNotes());
