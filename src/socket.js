import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export function createRoom() {

    socket.emit('create-room');

}


export function joinRoom(roomCode) {

    socket.emit(
        'join-room',
        roomCode
    );

}

socket.on('connect', () => {

    console.log('Connected to server');

    console.log('My ID:', socket.id);

});

socket.on('disconnect', () => {

    console.log('Disconnected from server');

});

export { socket };