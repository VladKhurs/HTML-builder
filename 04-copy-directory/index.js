const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname, 'files-copy'),
    { recursive: true },
    (err) => {
        if (err) {
            return console.error(err);
        }
});
const filePath = path.join(__dirname, '/files');
const filePathTarget = path.join(__dirname, '/files-copy');
fs.readdir(filePath, (err, files) => { 
    if (err) {
        console.log(err); 
    }
    else { 
        files.forEach(file => { 
            fs.copyFile(path.join(filePath, file), path.join(filePathTarget, file), (err) => {
              if (err) {
                  console.log(err);
              }
          });
        }) 
    } 
})
