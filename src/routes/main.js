const express = require('express'),
    rota = express.Router()


rota.get('/', async(req, res) => {
    res.render('index')
        // res.sendFile(__dirname + '../public/index.html')
})



module.exports = {
    path: '/',
    rota
}