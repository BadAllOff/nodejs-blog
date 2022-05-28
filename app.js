const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

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
app.use(blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: 'random title' });
}); 