const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Corrected typo
const app = express();
const socket=require('socket.io')
const userRoutes=require('./routes/userRoutes')
const messageRoutes=require('./routes/messagesRoutes')

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use('/api/auth',userRoutes)
app.use('/api/messages',messageRoutes)

mongoose.connect(process.env.MONGO_URL ,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

const server = app.listen(process.env.PORT, () => {
    console.log(`Starting on port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
})

global.onlineUsers = new Map()

io.on('connection', (socket) => {
    global.chatSocket = socket
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id)
    })
    socket.on('send-message', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', data.message)
        }
    })
})
