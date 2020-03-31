/**
 * File js of client side
 */
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //http://localhost:3000 dominio locale, in rete viene impostato da heroku
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if (data.errore) {
                messageTwo.textContent = data.errore
            } else {
                messageOne.textContent = data.descrizione
                messageTwo.textContent = 'Meteo: ' + data.forecast.summary + ' - °C ' + data.forecast.temperature
            }
        })
    })
})