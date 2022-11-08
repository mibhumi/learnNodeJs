const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{

    // lodash
    const num = _.random(20);
    console.log(num);

    const greet = _.once(()=>{
        console.log('namaste');
    });

    greet(); // call greet only once
    greet(); // not going to call
    
    // set header
    res.setHeader('content-type','text/html');

    //  write data on response of browser directly
    // res.write('<h1>hello world</h1>');
    // res.write('<p>My content</p>');
    // res.end();

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
            case '/about-me':
                res.statusCode = 301;
                res.setHeader('location', '/about');
                res.end();
                break;
        default: 
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path,(err, data) => {
        if(err) {
            console.log('error: ', err);
            res.end();
        } else {
            res.write(data);
            res.end();  //res.end(data)
        }

    })

});

server.listen(3000, 'localhost', ()=> {
    console.log('listening for request on port 3000');
});