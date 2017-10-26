const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const app = express();

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Emit event
   socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
   socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
   

   socket.on('createMessage', function (message, callback) {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
//         socket.broadcast.emit('newMessage', {
//             from: message.from,
//             text: message.text,
//             createAt: new Date().getDate()
//         });
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