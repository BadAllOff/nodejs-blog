const fs = require('fs')
const express = require('express');
const app = express();

// register view engine
app.set('view engine', 'ejs');


app.listen(3000);

app.get('/', (reg, res) => {
    res.render('index', {title: 'random title'});
});

app.get('/about', (reg, res) => {
    res.render('about', {title: 'random title'});
});

app.get('/blogs/create', (reg, res) => {
    res.render('create', {title: 'random title'});
});

app.use((req, res) => {
    res.status(404).render('404', {title: 'random title'});
});