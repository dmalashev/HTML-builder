const fs = require('fs');
const { log } = require('node:console');
const fsPromises = require('fs').promises; 
const path = require('node:path');


function copyDir(originalDirName) {
    const originalDirPath = path.join(__dirname, originalDirName);
    const copiedDirPath = path.join(__dirname, `${originalDirName}-copy`);

    fs.mkdir(copiedDirPath, { recursive: true }, (err) => {
        if (err) {
            console.log(err)
        } else {
            updateFiles(originalDirPath, copiedDirPath);
        }
    });

    console.log('Execution is complete');
}

function updateFiles(origDir, directDir) {
    fs.readdir(origDir, (err, filesNames) => {
        if (err) {
            console.log(err);
        } else {
            for (let fileName of filesNames) {
                copy(fileName, origDir, directDir);
            }

            deleteUnwantedFiles(filesNames, directDir);
        }
    })
}

function copy(fileName, origDir, directDir) {
    const originalFilePath = path.join(origDir, fileName);
    const copiedFilePath = path.join(directDir, fileName);

    fs.copyFile(originalFilePath, copiedFilePath, (err) => {
        if (err) console.log(err);
    })
}

function deleteUnwantedFiles(origFiles, directDir) {
    fs.readdir(directDir, (err, directFiles) => {
        if (err) {
            console.log(err);
        } else {
            const filesToDelete = directFiles.filter((file) => !origFiles.includes(file));

            if (filesToDelete.length > 0) {
                for (file of filesToDelete) {
                    const filePath = path.join(directDir, file);
                    fsPromises.rm(filePath);
                }
            }
        }
    })
}


copyDir('files');