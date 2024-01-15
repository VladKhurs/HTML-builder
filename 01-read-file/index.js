const fs = require('fs');
const path = require('path');
const readFilePath = path.join(__dirname, '/text.txt')
async function asincFileReader(filePath) {
    const reader = fs.createReadStream(filePath, 'utf8');
    for await (const data of reader) {
        console.log(data);
    }
}
asincFileReader(readFilePath)
