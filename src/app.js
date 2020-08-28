const express = require('express'),
    path = require('path'),
    app = express()

// const cors = require('cors')
// app.use(cors())

const config = require('./config/config.json')

var http = require('http').createServer(app);
var io = require('socket.io')(http);

// app.set('io', io);
app.use(express.static(path.join(__dirname, 'public')))
app.set('html', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(express.json())

console.clear()
    //rotas

let router = require('./router')

let messages = []

io.on('connection', (socket) => {
    console.log('Socket conectado')

    socket.emit('db', messages)

    socket.on('sendMessage', (data) => {
        messages.push(data)
        socket.broadcast.emit('newMessage', data)
    })

    socket.on('disconnect', () => {
        console.log('socket desconectdo')
    })
})

app.use(router)
app.use((req, res) => {
    res.status(404).send('Pagina não encontrada')
})

http.listen(config.porta, () => {
    console.log(`Rodando na porta ${config.porta}`)
})