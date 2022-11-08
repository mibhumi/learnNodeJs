const fs = require('fs');

// reading file
fs.readFile('./demo.txt', (err, data)=>{
    if(err) {
        console.log('error: ', err);
    } else if(data) {
        console.log('data: ', data);
    }
});

// writing file
fs.writeFile('./demo.txt', 'Hello World', ()=>{ console.log('writeFile function exicuted') } );

// directories
if (!fs.existsSync('./asserts')) {
    fs.mkdir('./asserts', (err) => {
        if(err) {
            console.log('err: ', err);
        }
    })
}

// deleting files
if(fs.existsSync('./demo1.txt')) {
    fs.unlink('./demo1.txt', (err)=> {
        err ?  console.log('Error: ', err) : null ;
        console.log('file has been deleted');

    })
}

console.log('last line');