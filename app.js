const fs = require('fs');

// fs.writeFileSync('notes.txt', 'This file was created by me from Node.JS. Just updated it with additional text!');

fs.appendFileSync('notes.txt', '\nAppended text here!!!');
