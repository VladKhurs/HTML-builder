const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname, 'project-dist1111314'),
    { recursive: true },
    (err) => {
        if (err) {
            return console.error(err);
        }
});
const projectPath = path.join(__dirname, '/project-dist1111314');
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
            fs.mkdir(currentFolder,
                { recursive: true },
                (err) => {
                    if (err) {
                        return console.error(err);
                    }
            });
        }) 
    } 
})
let readWriter = () => {
    fs.readdir(assetsPath, (err, files) => { 
        if (err) {
            console.log(err); 
        }
        else {
            files.forEach(folder => { 
                const currentFolder = path.join(assetsPathTarget, folder)
                const dataFolder = path.join(assetsPath, folder)
                fs.readdir(dataFolder, (err, innerFiles) => { 
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
}
readWriter()
const stylePath = path.join(projectPath, 'style.css');
const streamClean = fs.createWriteStream(stylePath, {flags: 'w'});
streamClean.write('');
streamClean.end();
async function fileReaderAndWriter(filePath) {
    const reader = fs.createReadStream(filePath, 'utf8');
    for await (const data of reader) {
        const stream = fs.createWriteStream(stylePath, {flags: 'a'});
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
const htmlPath = path.join(projectPath, 'index.html');
const componentsPath = path.join(__dirname, '/components');
const streamCleanHtml = fs.createWriteStream(htmlPath, {flags: 'w'});
streamCleanHtml.write('');
streamCleanHtml.end();
const template = path.join(__dirname, 'template.html');
async function compileHtml(filePath) {
    const reader = fs.createReadStream(filePath, 'utf8');
    for await (const data of reader) {
        let dataMutate = data;
        while (dataMutate.indexOf('{{') !== -1) {
            let tagCompon = dataMutate.slice(dataMutate.indexOf('{{'), dataMutate.indexOf('}}') + 2)
            let componWord = tagCompon.slice(2, tagCompon.length - 2)
            let isExist = false;
                const innerReader = fs.createReadStream(path.join(componentsPath, componWord + '.html'), 'utf8');
                for await (const data of innerReader) {
                    dataMutate = dataMutate.replace(tagCompon, data);
                }
        }
        const stream = fs.createWriteStream(htmlPath, {flags: 'a'});
        stream.write(dataMutate, 'utf8');
        stream.end();
    }
}
compileHtml(template);
