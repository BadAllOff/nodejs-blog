const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const Blog = require('./models/blog');

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

app.use(express.static('public'));

app.get('/', (reg, res) => {
    res.redirect('/blogs');
    // res.render('index', { title: 'random title' });
});

app.get('/about', (reg, res) => {
    res.render('about', { title: 'random title' });
});

// blog routes
app.get('/blogs', (reg, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'Blog page', blogs: result });
        })
        .catch(err => console.log(err))
})

app.get('/blogs/create', (reg, res) => {
    res.render('create', { title: 'random title' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'random title' });
}); 