const express = require('express'),
    rota = express.Router()


rota.get('/', async (req, res) => {
    res.send('main')
})

module.exports = {
    path: '/',
    rota
}