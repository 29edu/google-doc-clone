import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import db from './src/config/database.js';
import User from './src/models/user.models.js';
import {createServer} from 'http'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';

// Middleware
const app = express();
const server = createServer(app);
app.use(express.json())
const io = new Server(server);

// Router
import userRoutes from './src/routes/userRoutes.js'
app.use('/api/', userRoutes);

const PORT = process.env.PORT;

const connect = async () => {

    const response = await db();
    console.log(response)
    server.listen(PORT, () => {
    console.log(`The server is connected to the http://localhost:${PORT}`);
})
}

// Server io
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname,'public')));

app.get('/', (req,res) => {
    res.sendFile((join(__dirname, 'public', 'index.html')));
})

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.broadcast.emit('hi');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // this broadcast to everyone
        // socket.broadcast.emit('chat message', msg) sends to everyone except the sender
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
        
    })
})

connect();


// 