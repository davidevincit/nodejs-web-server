const request = require('request')


const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adress + '.json?access_token=pk.eyJ1IjoiZGF2aWRlOTU2MiIsImEiOiJjazg3aWplcDUwbnJnM2ZvODBuNTNjNzIxIn0.O9L4qbIxW1fmjBHI3zOdvA'
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {

        if (error) {
            callback("Errore di connessione.", undefined)

        } else if (body.features.length === 0) {
            callback("Errore input search word.", undefined)
        } else {
            callback(undefined, {
                latitudine: body.features[0].center[1],
                longitudine: body.features[0].center[0],
                descrizione: body.features[0].place_name

            })

        }
    })
}

module.exports = geocode