const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');


const app = express();

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Emit event
    //    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    //    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
   
   socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        }

        // Create join rom
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
   });

    
   

   socket.on('createMessage', function (message, callback) {
        // console.log('createMessage', message);
        var user = users.getUser(socket.id);

        if (user && isRealString) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        callback();
   });

   socket.on('createLocationMessage', (coords) => {
       var user = users.getUser(socket.id);

       if (user) {
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
       }
        
   });

    socket.on('disconnect', () => {
        // console.log('User was disconnected');
        var user = users.removeUser(socket.id);
        
            if (user) {
                io.to(user.room).emit('updateUserList', users.getUserList(user.room));
                io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
            }
    });
});



// app.get('/', (req, res) => {
//     res.send('Node Chat App');
// });


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});