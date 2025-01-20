const fs = require('fs');
const path = require('node:path');


const projectDistPath = path.join(__dirname, 'project-dist');


fs.mkdir(projectDistPath, { recursive: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        const indexPath = path.join(projectDistPath, 'index.html');

        fs.open(indexPath, 'w', (err) => {
            if (err) {
                console.log(err);
            } else {
                const templatePath = path.join(__dirname, 'template.html');
                const templateData = fs.createReadStream(templatePath, { encoding: 'utf-8' });
                let data = '';

                templateData.on('data', (chunk) => {
                    data += chunk;
                });

                templateData.on('end', () => {
                    const componentsPath = path.join(__dirname, 'components');

                    fs.readdir(componentsPath, (err, files) => {
                        if (err) {
                            console.log(err);
                        } else {
                            for (let i = 0; i < files.length; i++) {
                                const fileExt = path.extname(files[i]);

                                if (fileExt === '.html') {
                                    const fileName = files[i].replace(fileExt, '');
                                    const filePath = path.join(componentsPath, files[i]);


                                    const componentData = fs.createReadStream(filePath, { encoding: 'utf-8' });
                                    let componentsText = '';

                                    componentData.on('data', (chunk) => {
                                        componentsText += chunk;
                                    });

                                    componentData.on('end', () => {
                                        data =  data.replace(`{{${fileName}}}`, `\n${componentsText}\n`);
                                        
                                        if (i === files.length - 1) {
                                            fs.appendFile(indexPath, data, (err) => {
                                                if (err) {
                                                    console.log(err);
                                                }
                                            })
                                        }
                                    });
                                }
                            }
                        }
                    });
                });
            }
        });
    }
});
