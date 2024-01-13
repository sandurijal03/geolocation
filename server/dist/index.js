"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
let onlineUsers = {};
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
        console.log('user connected of the id: ' + socket.id);
        socket.on('user-login', (data) => loginEventHandler(socket, data));
        socket.on('disconnect', () => {
            disconnectEventHandler(socket.id);
        });
    });
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
        console.log(`server running on port: ${port}`);
    });
};
const disconnectEventHandler = (id) => {
    console.log(`user disconnected of the id : ${id}`);
    removeOnlineUser(id);
};
const loginEventHandler = (socket, data) => {
    socket.join('logged-users');
    onlineUsers[socket.id] = {
        username: data.username,
        coords: data.coords,
    };
    console.log('users', onlineUsers);
    io.to('logged-users').emit('online-users', convertOnlineUsersToArray());
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
const removeOnlineUser = (socketId) => {
    if (onlineUsers[socketId]) {
        delete onlineUsers[socketId];
    }
    console.log('onlineUsers', onlineUsers);
};
mountServer();
