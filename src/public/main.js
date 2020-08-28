let socket = io();
let mdsleng = 0

socket.on('connect', (cliente) => {
    console.log('socket conectado')
    document.getElementById('messages').innerHTML = ''
        // document.location.reload()
})
socket.on('newMessage', data => {
    addMessage(data)
})
socket.on('db', db => {
    for (message of db) {
        addMessage(message)
    }
})
socket.on('usersCount', (data) => {
    let botao = document.getElementById('enviar')

    botao.innerText = `Enviar para ${data}`
})

let messages = document.getElementById('messages')
let form = document.getElementById('chat')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let author = document.getElementById('nome').value
    let message = document.getElementById('message').value

    let messageObject = {
        author,
        message
    }

    socket.emit('sendMessage', messageObject)
    addMessage(messageObject)
    message = document.getElementById('message')
    message.value = ''
    message.focus()
})

function addMessage({
    author,
    message
}) {

    let p = document.createElement('p')
    p.innerHTML = `<strong>${author}</strong>: ${message}`
    messages.appendChild(p)
    messages.scroll(0, 100 * mdsleng++)
}