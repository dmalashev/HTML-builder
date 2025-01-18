const fs = require('fs');
const path = require('node:path');

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, { withFileTypes: true }, (err, entities) => {
    if(err) {
        console.log(err)
    } else {
        for (let entity of entities) {
            if (entity.isFile()) {
                fs.stat(path.join(entity.path, entity.name), (err, fileInfo) => {
                    if (err) {
                        console.log(err)
                    } else {
                        const extension = path.extname(entity.name);
                        const name = entity.name.replace(extension, '');
                        const size = fileInfo.size;

                        console.log(`${name} - ${extension.replace('.', '')} - ${size}B`);
                    }
                });
            }
        }
    }
})