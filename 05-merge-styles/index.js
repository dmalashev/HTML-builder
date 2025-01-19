const fs = require('fs');
const path = require('node:path');

const stylesDirPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

let isFirstContent = true;

fs.open(bundlePath, 'w', (err) => {
    if (err) console.log(err);
});

fs.readdir(stylesDirPath, { withFileTypes: true }, (err, entities) => {
    if (err) {
        console.log(err);
    } else {
        for (let entity of entities) {
            if (entity.isFile() && path.extname(entity.name) === '.css') {
                const filePath = path.join(stylesDirPath, entity.name);

                const data = fs.createReadStream(filePath, { encoding: 'utf-8' });

                data.on('data', (chunk) => {
                    let content = chunk;
                    if (!isFirstContent) {
                        content = '\n' + content;
                    }
                    
                    fs.appendFile(bundlePath, content, (err) => {
                        if (err) console.log(err);
                    });

                    isFirstContent = false;
                });
            }
        }

        console.log('\n"bundle.css" has been created in "project-dist" folder');
    }
});