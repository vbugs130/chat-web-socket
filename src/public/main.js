let socket = io();
let mdsleng = 0

socket.on('connect', (cliente) => {
    console.log('socket conectado')
})
socket.on('newMessage', data => {
    addMessage(data)
})
socket.on('db', db => {
    for (message of db) {
        addMessage(message)

    }
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
    document.getElementById('message').value = ''
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