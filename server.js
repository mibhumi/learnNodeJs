const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    console.log('request made');
    console.log('request method ' + req.method + ' request url ' + req.url );
    
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