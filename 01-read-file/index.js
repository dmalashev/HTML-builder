const fs = require('fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'text.txt');

const data = fs.createReadStream(filePath, {
    encoding: 'utf-8'
})

data.on('data', (chunk) => console.log(chunk));