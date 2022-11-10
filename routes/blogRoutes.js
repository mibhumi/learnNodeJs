const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

// blog routes
router.get('/', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result)=>{
            res.render('index', {title: 'All Blogs', blogs: result});
        })
        .catch((err)=> { 
            console.log(err)
        })
});

// handle post request for blogs
router.post('/', (req, res) => {
const newBlog = Blog(req.body);
newBlog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.get('/create', (req, res) => {
    res.render('create', {title: 'Create Blog'});
});

router.get('/:id', (req, res) => {
const id = req.params.id;
Blog.findById(id)
    .then((result)=>{
        res.render('details', { blog: result, title: 'blog details' })
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.delete('/:id', (req, res) => {
const id = req.params.id;
Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({ redirect: '/blogs'});
    })
    .catch((err)=>{
        console.log(err);
    });
});

module.exports = router;
