const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const {v4: uuidv4} = require('uuid');

const app = express();
const port = 5000;
const corsOptions = {origin: 'http://localhost:3000', credentials: true};
app.use(cors(corsOptions));
const server = http.createServer(app);
const io = new Server(server, {transports: ['websocket', 'polling']});
io.attach(server);
let players = [];

io.on('connection', (connection) => {
    console.log('A client connected');

    const {func, name, sign, url, roomCode } = connection.handshake.query;
    connection.join(roomCode);
    switch (func) {
        case 'removeAllPlayersInThisRoomCode':
            players = players.filter(player => player.roomCode !== roomCode);
            connection.emit('playersRemoved', roomCode); // Emit an event to notify clients about the removed players
            break;
        case 'getAllPlayersInThisRoomCode':
            const roomPlayers = players.filter(player => player.roomCode === roomCode);
            connection.emit('allPlayersInRoom', roomPlayers); // Emit the list of players back to the client
            break;
        case 'addPlayer':
            const newPlayer = {name: name, sign: sign, url: url, roomCode: roomCode};
            players.push(newPlayer);
            connection.emit('playerAdded', newPlayer); // Emit an event to notify clients about the new player
            break;
        default:
            break;
    }

    connection.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
        io.emit('message', `Server: ${message}`);
    });

    /*
    connection.on('removeAllPlayersInThisRoomCode', (roomCode) => {
        players = players.filter(player => player.roomCode !== roomCode);
        connection.emit('playersRemoved', roomCode); // Emit an event to notify clients about the removed players
    });

    connection.on('getAllPlayersInThisRoomCode', (roomCode) => {
        const roomPlayers = players.filter(player => player.roomCode === roomCode);
        connection.emit('allPlayersInRoom', roomPlayers); // Emit the list of players back to the client
    });

    connection.on('addPlayer', (player) => {
        const {message, name, sign, url, roomCode} = player;
        console.log(`Message: ${message}`);
        const newPlayer = {name: name, sign: sign, url: url, roomCode: roomCode};
        players.push(newPlayer);
        connection.emit('playerAdded', newPlayer); // Emit an event to notify clients about the new player
    });
     */

    connection.on('disconnect', () => console.log('A client disconnected'));
});

app.use(express.json());

app.post('/', (req, res) => res.send(JSON.stringify(players)));
app.get('/socket.io', (req, res) => res.send(JSON.stringify(players)));
app.get('/', (req, res) => res.send(JSON.stringify(players)));

app.post('/negotiate', (req, res) => {
    const connectionToken = uuidv4(undefined, undefined, undefined);
    const negotiateResponse = {
        connectionId: connectionToken,
        availableTransports: [
            {transport: 'WebSockets', transferFormats: ['Text', 'Binary']},
            {transport: 'LongPolling', transferFormats: ['Text', 'Binary']},
        ],
    };
    res.json(negotiateResponse);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});