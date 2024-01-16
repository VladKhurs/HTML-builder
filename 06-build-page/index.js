const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname, 'project-dist1'),
    { recursive: true },
    (err) => {
        if (err) {
            return console.error(err);
        }
});
const projectPath = path.join(__dirname, '/project-dist1');
fs.mkdir(path.join(projectPath, 'assets'),
    { recursive: true },
    (err) => {
        if (err) {
            return console.error(err);
        }
});
const assetsPath = path.join(__dirname, 'assets');
const assetsPathTarget = path.join(projectPath, 'assets');
fs.readdir(assetsPath, (err, files) => { 
    if (err) {
        console.log(err); 
    }
    else { 
        files.forEach(folder => { 
            const currentFolder = path.join(assetsPathTarget, folder)
            const dataFolder = path.join(assetsPath, folder)
            console.log('1', currentFolder, dataFolder)
            fs.mkdir(currentFolder,
                { recursive: true },
                (err) => {
                    if (err) {
                        return console.error(err);
                    }
            });
            fs.readdir(dataFolder, (err, innerFiles) => { 
                console.log('2', currentFolder, dataFolder)
                if (err) {
                    console.log(err); 
                }
                else { 
                    innerFiles.forEach(file => { 
                        fs.copyFile(path.join(dataFolder, file), path.join(currentFolder, file), (err) => {
                            if (err) {
                                    console.log(err);
                            }
                        });
                    }) 
                } 
            })
        }) 
    } 
})
