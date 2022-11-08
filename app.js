const express = require('express');

// calling express
const app = express();

// listen for request port 3000
app.listen(3000);

// request
app.get('/', (req, res) => {
    // res.status(200).send('<p>managing using expresss</p>');
    res.sendFile('./views/index.html', {root: __dirname});
    // res.sendStatus(200);
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', {root: __dirname});
});

// redirect
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

// 404 use this function for every coming request
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});