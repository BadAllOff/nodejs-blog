const fs = require('fs')
const express = require('express');
const app = express();

// register view engine
app.set('view engine', 'ejs');


app.listen(3000);

app.get('/', (reg, res) => {
    res.render('index');
});

app.get('/about', (reg, res) => {
    res.render('about');
});

app.use((req, res) => {
    res.status(404).render('404');
});