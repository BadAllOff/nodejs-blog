const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const _ = require('lodash');

// express app
const app = express();

// connect to db
// saving credentials here is dangerous but we don't give a fuck for now
const dbURI = 'mongodb+srv://nodetuts:rmQH47MYHMXVZuc@nodejstut.tjfw6.mongodb.net/nodetuts?retryWrites=true&w=majority'

mongoose.connect(dbURI)
    .then(result => app.listen(3000))
    .catch(err => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });


app.get('/', (q, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'random title' });
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'Blog page', blogs: result });
        })
        .catch(err => console.log(err))
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    console.log(req.body)
    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'random title' });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(result => res.render('details', { blog: result, title: result.title }))
        .catch(err => console.log(err))
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blogs'})
        })
        .catch(err => console.log(err));
})

app.use((req, res) => {
    res.status(404).render('404', { title: 'random title' });
}); 