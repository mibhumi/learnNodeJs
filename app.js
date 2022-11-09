const express = require('express');
const morgan = require('morgan');
// const ejs = require('ejs');

// calling express
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for request port 3000
app.listen(3000);

// middleware and static files 
// app.use(express.static('public')); // inside public folder all the files are accessable by browser
app.use(express.static('public'));

app.use(morgan('tiny'));

// basic middleware
// app.use((req, res, next) => {
//     console.log('new request made');
//     console.log('host', req.host);
//     console.log('path', req.path);
//     console.log('method', req.method);
//     next();
// })

// request
app.get('/', (req, res) => {
    const blogs = [
        {title: 'new york', snippet: 'it is a city'},
        {title: 'delhi', snippet: 'it is a captial of india'},
        {title: 'miltion', snippet: 'it is part of ontario'}
    ];
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blog/create', (req, res) => {
    res.render('create', {title: 'Create Blog'});
});

// redirect
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

// 404 use this function for every coming request
app.use((req, res) => {
    res.status(404).render('404', {title: ''});
});