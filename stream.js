const fs = require('fs');

const readStream = fs.createReadStream('./documents/demo.txt', {encoding: 'utf8'}); // encoding is optional to display data in readable format
const writeStream = fs.createWriteStream('./documents/ newFile.txt');

// readStream.on('data', (chunk) => {
//     console.log('------- new message -------');
//     console.log(chunk);
//     writeStream.write('\n-------- new data ------- \n')
//     writeStream.write(chunk);
// });

// alternative way of above

readStream.pipe(writeStream);