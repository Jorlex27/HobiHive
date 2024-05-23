const express = require('express');
const session = require('express-session');
const passport = require('passport');
const routers = require('./routes');
const flash = require('connect-flash');
const http = require('http')
const socketIo = require('socket.io'); 
require('./middlewares/passport-setup');
const app = express();

const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'Gus Alex',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(routers);

// io.on('connection', (socket) => {
//     socket.on('message', (msg) => {
//         console.log(msg);
//         socket.broadcast.emit('message', msg);
//     });
// });

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`User left room: ${room}`);
    });

    socket.on('message', (room, msg, clientId) => {
        io.to(room).emit('message', {msg, clientId});
        console.log(`Message sent to room ${room}: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});