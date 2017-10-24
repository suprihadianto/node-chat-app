const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Emit event
   socket.emit('newMessage', {
        from: 'Supri@gmail.com',
        text: 'Hey!.. How are you',
        createAt: new Date().toLocaleString()
   });

   socket.on('createMessage', (message) => {
        console.log('createMessage', message)
   });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});



// app.get('/', (req, res) => {
//     res.send('Node Chat App');
// });


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});