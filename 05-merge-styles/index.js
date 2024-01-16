const fs = require('fs');
const path = require('path');
const bundlePath = path.join(__dirname, '/project-dist/bundle.css');
const streamClean = fs.createWriteStream(bundlePath, {flags: 'w'});
streamClean.write('');
streamClean.end();
async function fileReaderAndWriter(filePath) {
    const reader = fs.createReadStream(filePath, 'utf8');
    for await (const data of reader) {
        const stream = fs.createWriteStream(bundlePath, {flags: 'a'});
        stream.write(data, 'utf8');
        stream.end();
    }
}
const stylesPath = path.join(__dirname, '/styles');
fs.readdir(stylesPath, (err, files) => { 
    if (err) {
        console.log(err); 
    }
    else {
        files.forEach(file => { 
            fs.stat(path.join(stylesPath, file), (err, stats) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (stats.isFile() === true && path.extname(file) == ".css") {
                    fileReaderAndWriter(path.join(stylesPath, file))
                }
            });
        })
    } 
})
