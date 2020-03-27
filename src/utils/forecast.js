const request = require('request')


const forecast = (latitudine, longitudine, callback) => {

    const url = 'https://api.darksky.net/forecast/c001c86c5576860060edf3dc8b24bc68/' + latitudine + ',' + longitudine + '?lang=it&units=si'

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback("Errore di connessione.", undefined)
        } else if (body.error) {
            callback("Errore input. Coordinate errate.", undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature
            })

        }
    })
}

module.exports = forecast