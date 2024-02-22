import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import {IPlayer} from "../redux/Players/IPlayer";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const players: IPlayer[] = [];

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

app.post('/api/addPlayer', (req, res) => {
    const {name, sign, url, roomCode} = req.body;
    const newUser: IPlayer = {name, sign, url, roomCode};
    players.push(newUser);
    res.json({success: true});
});

app.post('/api/removeAllPlayersInThisRoomCode', (req, res) => {
    const {rcToRemove} = req.body;
    const tempPlayers = players.filter(item => item.roomCode !== rcToRemove);
    players.length = 0;
    players.push(...tempPlayers);
    res.json({success: true});
});

app.get('/api/getAllPlayersInThisRoomCode', (req, res) => {
    const {rcToRemove} = req.body;
    res.json(players.filter(item => item.roomCode === rcToRemove));
});

app.post('/api/sendMessage', (req, res) => {
    const {message} = req.body;
    // Broadcast the message to all connected clients
    io.emit('message', `Server: ${message}`);
    res.json({success: true});
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});