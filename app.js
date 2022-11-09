const express = require('express');
// const ejs = require('ejs');

// calling express
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for request port 3000
app.listen(3000);

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