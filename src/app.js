const express = require('express'),
    app = express()

const cors = require('cors')

const config = require('./config/config.json')

app.use(express.json())
app.use(cors())

console.clear()
//rotas

let router = require('./router')

app.use(router)
app.use((req, res) => {
    res.status(404).send('Pagina não encontrada')
})

app.listen(config.porta, () => {
    console.log(`Rodando na porta ${config.porta}`)
})