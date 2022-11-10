const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// calling express
const app = express();

// connect to database
// listen for request port 3000 if connection to db is successful
const dbURI = "mongodb+srv://bhumi:12345@learnnodejs.hhjfbi0.mongodb.net/demo?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=>app.listen(3000))
    .catch((err)=> console.log('error: ', err));

// register view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req,res) => {
//     const blog = new Blog({
//         title: 'my new blog',
//         snippet: 'new snippet',
//         body: 'my new blog body'
//     });

//     blog.save()
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
// })

// app.get('/all-blogs', (req,res) => {
//     Blog.find()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=> { 
//             console.log(err)
//         })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('636b3dfca2da2fcbf00907b7')
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=> { 
//             console.log(err)
//         })
// })

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

    res.redirect('/blogs');

    // const blogs = [
    //     {title: 'new york', snippet: 'it is a city'},
    //     {title: 'delhi', snippet: 'it is a captial of india'},
    //     {title: 'miltion', snippet: 'it is part of ontario'}
    // ];
    // res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// blog routes
app.get('/blogs', (req, res) => {
        Blog.find().sort({createdAt: -1})
            .then((result)=>{
                res.render('index', {title: 'All Blogs', blogs: result});
            })
            .catch((err)=> { 
                console.log(err)
            })
});

// handle post request for blogs
app.post('/blogs', (req, res) => {
    const newBlog = Blog(req.body);
    newBlog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        });
});


app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result)=>{
            res.render('details', { blog: result, title: 'blog details' })
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({ redirect: '/blogs'});
        })
        .catch((err)=>{
            console.log(err);
        });
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