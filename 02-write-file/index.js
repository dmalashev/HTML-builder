const fs = require('fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'text.txt');

fs.open(filePath, 'w', (err) => {
    if (err) console.log(err);
});


console.log('\nWelcome! Write here the text. Type "exit" or press Ctrl + C to exit from the typing.\n');


process.stdin.setEncoding('utf-8');

process.stdin.on('data', (chunk) => {
    if (chunk.trim() === 'exit') {
        exit();
    }

    fs.appendFile(filePath, chunk, (err) => {
        if (err) console.log(err);
    });
});

process.on('SIGINT', exit);


function exit() {
    console.log('\nThe text is saved in the "text.txt" file. Good bye!\n');

    process.exit();
}