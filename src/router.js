const express = require('express'),
    router = express.Router()

const fs = require('fs')

fs.readdir(__dirname + '/routes', (err, pasta) => {
    if (err) return console.log(err.message)

    pasta.forEach((name, index) => {
        let { path, rota } = require('./routes/' + name)

        console.log(`Rota ${path} carregada`)

        router.use(path, rota)
    })
})


module.exports = router