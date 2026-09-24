const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

// Store active rooms
const rooms = {};

io.on('connection', (socket) => {

    console.log('Player connected:', socket.id);


    // CREATE ROOM
    socket.on('create-room', () => {

        const roomCode =
            Math.random().toString(36).substring(2, 8).toUpperCase();

        rooms[roomCode] = {
            players: []
        };

        socket.join(roomCode);

        rooms[roomCode].players.push(socket.id);

        console.log('Room created:', roomCode);

        socket.emit('room-created', roomCode);
    });


    // JOIN ROOM
    socket.on('join-room', (roomCode) => {

        if (!rooms[roomCode]) {

            socket.emit('room-error', 'Room does not exist');

            return;
        }

        socket.join(roomCode);

        rooms[roomCode].players.push(socket.id);

        console.log(
            socket.id,
            'joined room',
            roomCode
        );

        socket.emit('room-joined', roomCode);

        socket.to(roomCode).emit(
            'player-joined',
            socket.id
        );
    });


    // DISCONNECT
    socket.on('disconnect', () => {

        console.log(
            'Player disconnected:',
            socket.id
        );

    });

});


server.listen(3000, () => {

    console.log(
        'Server running on port 3000'
    );

});