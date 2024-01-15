const fs = require('node:fs');
const path = require('path');
const filePath = path.join(__dirname, '/secret-folder');
fs.readdir(filePath, (err, files) => { 
    if (err) {
        console.log(err); 
    }
    else { 
        files.forEach(file => { 
            fs.stat(path.join(filePath, file), (err, stats) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (stats.isFile() === true) {
                    console.log(file.replace('.', ' - '), ' - ', stats.size);
                }
            });
        }) 
    } 
}) 
