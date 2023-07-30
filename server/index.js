const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

app.get('/',(req,res)=>{
  res.send('Bateu')
})

const io = socketio(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (data) => {
    console.log('Received message:', data);

    socket.emit('message', 'Hello from the server!');
  });
});