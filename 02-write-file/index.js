const fs = require('node:fs');
const path = require('path');
const readline = require('node:readline');
fs.writeFile('text.txt', '', function (err) {
    if (err) throw err;
});
const filePath = path.join(__dirname, '/text.txt');
const stream = fs.createWriteStream(filePath, {flags: 'a'});
stream.write('');
stream.end();
let reader = readline.createInterface(process.stdin, process.stdout);
reader.setPrompt(`Input the text and it will be written to a file: `);
reader.prompt();
reader.on('line', (data) => {
    if (data === 'exit') {
        reader.close();
    }
    else {
        reader.prompt();
        try {
            const stream = fs.createWriteStream(filePath, {flags: 'a'});
            stream.write(data, 'utf8');
            stream.end();
        } catch (err) {
            console.log(err.message);
        }
    }
});
process.on('exit', () => {
    console.log(`\nGoodbye, come here again!`);
});
