const express = require('express')
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define app express
const app = express()
const port = process.env.PORT || 3000

//define paths express
const publicPath = path.join(__dirname, "../public")
const templatesPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup hbs and views path express 
app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)

//setup public static path
app.use(express.static(publicPath))


//like a servlet: response in html or json format

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Davide Vincitorio'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Davide Vincitorio'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        texthelp: 'Help me, please!',
        name: 'Davide Vincitorio'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errore: 'Bisogna impostae il parametro address.'
        })
    }

    geocode(req.query.address, (errore, {
        latitudine,
        longitudine,
        descrizione
    } = {}) => {
        if (errore) {
            return res.send({
                errore
            })
        }

        forecast(latitudine, longitudine, (errore, forecastData) => {
            if (errore) {
                return res.send({
                    errore
                })
            }
            res.send({
                forecast: forecastData,
                descrizione,
                address: req.query.address
            })
        })
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Davide Vincitorio',
        errorMessage: 'Page not found!'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Davide Vincitorio',
        errorMessage: 'Page not found!'
    })
})


app.listen(port, () => {
    console.log("Server up on port " + port)
})