const express = require('express');
const path = require('path');
let app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.use(express.static(path.join(__dirname, '../public')));
//app.set('views', path.join(__dirname, '../templates'));//To set new location for views, by default express expect views directory in the root.
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../views/partial'));

app.get('/', (req, res) => {
    res.render('index', {title: 'Weather', name: 'Sadiq'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About us', name: 'Sadiq'});
});

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help Page', name: 'Sadiq'});
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('*', (req, res) => {
    res.render('404', {title: 'Page Not Found', name: 'Sadiq'})
})

/*app.get('/', (req, res) => {
    res.send('Hello Express.');
});

app.get('/contact', (req, res) => {
    res.send({phone: '03369018156', email: 'sadiq810@gmail.com'});
});

app.get('/about', (req, res) => {
    res.send('<h1>Welcome to about us page.</h1>');
});*/


app.listen(port, () => {
    console.log('The server is up and running at port: '+ port)
});