"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const peer_1 = require("peer");
let onlineUsers = {};
let videoRooms = {};
var io;
const mountServer = () => {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    app.use((0, cors_1.default)());
    app.get('/', (req, res) => {
        res.send('hello world');
    });
    io = new socket_io_1.Server(server, {
        allowEIO3: true,
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        socket.on('user-login', (data) => loginEventHandler(socket, data));
        socket.on('chat-message', (data) => chatMessageHandler(socket, data));
        socket.on('video-room-create', (data) => videoRoomCreateHandler(socket, data));
        socket.on('disconnect', () => {
            disconnectEventHandler(socket.id);
        });
    });
    const peerServer = (0, peer_1.PeerServer)({ port: 9000, path: '/peer' });
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
        console.log(`server running on port: ${port}`);
    });
};
mountServer();
const disconnectEventHandler = (id) => {
    removeOnlineUser(id);
    broadcastDisconnectedUserDetails(id);
};
const loginEventHandler = (socket, data) => {
    socket.join('logged-users');
    onlineUsers[socket.id] = {
        username: data.username,
        coords: data.coords,
    };
    io.to('logged-users').emit('online-users', convertOnlineUsersToArray());
};
const chatMessageHandler = (socket, data) => {
    const { receiverSocketId, content, id } = data;
    if (onlineUsers[receiverSocketId]) {
        io.to(receiverSocketId).emit('chat-message', {
            senderSocketId: socket.id,
            content,
            id,
        });
    }
};
const videoRoomCreateHandler = (socket, data) => {
    const { peerId, newRoomId } = data;
    videoRooms[newRoomId] = {
        participants: [
            {
                socketId: socket.id,
                username: onlineUsers[socket.id].username,
                peerId,
            },
        ],
    };
    broadcastVideoRooms();
};
const removeOnlineUser = (socketId) => {
    if (onlineUsers[socketId]) {
        delete onlineUsers[socketId];
    }
};
const broadcastDisconnectedUserDetails = (disconnectedUsersSocketId) => {
    io.to('logged-users').emit('user-disconnected', disconnectedUsersSocketId);
};
const broadcastVideoRooms = () => {
    io.emit('video-rooms', videoRooms);
};
const convertOnlineUsersToArray = () => {
    const onlineUsersArray = [];
    Object.entries(onlineUsers).forEach(([key, value]) => {
        onlineUsersArray.push({
            socketId: key,
            username: value.username,
            coords: value.coords,
        });
    });
    return onlineUsersArray;
};
