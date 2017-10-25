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
        from: 'Admin',
        text: 'Welcome node the chat app',
        createAt: new Date().getTime().toLocaleString()
   });
   socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createAt: new Date().getTime().toLocaleString()
});
   

   socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
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