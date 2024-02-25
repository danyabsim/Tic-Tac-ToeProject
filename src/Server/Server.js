const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server);
io.attach(server);

let players = [];

io.on('connection', (socket) => {
    console.log('A client connected');

    // Listen for messages from clients
    socket.on('message', (message) => {
        console.log(`Received message from client: ${message}`);

        // Broadcast the message to all connected clients
        io.emit('message', `Server: ${message}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

app.use(express.json());

// Handle HTTP requests
app.get('/', (req, res) => {
    res.send(JSON.stringify(players));
});

app.post('/api/addPlayer', (req, res) => {
    const { name, sign, url, roomCode } = req.body;
    const newUser = { name, sign, url, roomCode };
    players.push(newUser);
    res.json({ success: true });
});

app.post('/api/removeAllPlayersInThisRoomCode', (req, res) => {
    const { roomCode } = req.body;
    const tempPlayers = players.filter(item => item.roomCode !== roomCode);
    players.length = 0;
    players.push(...tempPlayers);
    res.json({ success: true });
});

app.get('/api/getAllPlayersInThisRoomCode', (req, res) => {
    //players = req.body;
    const { roomCode } = req.body;
    res.json(players.filter(item => item.roomCode === roomCode));
});

app.post('/api/sendMessage', (req, res) => {
    const { message } = req.body;
    // Broadcast the message to all connected clients
    io.emit('message', `Server: ${message}`);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});