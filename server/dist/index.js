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
        socket.on('video-room-join', (data) => {
            videoRoomJoinHandler(socket, data);
        });
        socket.on('video-room-leave', (data) => {
            videoRoomLeaveHandler(socket, data);
        });
        socket.on('disconnect', () => {
            disconnectEventHandler(socket);
        });
    });
    const peerServer = (0, peer_1.PeerServer)({ port: 9000, path: '/peer' });
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
        console.log(`server running on port: ${port}`);
    });
};
mountServer();
const disconnectEventHandler = (socket) => {
    checkIfUserIsInCall(socket);
    removeOnlineUser(socket.id);
    broadcastDisconnectedUserDetails(socket.id);
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
const videoRoomJoinHandler = (socket, data) => {
    const { roomId, peerId } = data;
    if (videoRooms[roomId]) {
        videoRooms[roomId].participants.forEach((participant) => {
            socket.to(participant.socketId).emit('video-room-init', {
                newParticipantPeerId: peerId,
            });
        });
        videoRooms[roomId].participants = [
            ...videoRooms[roomId].participants,
            {
                socketId: socket.id,
                username: onlineUsers[socket.id].username,
                peerId,
            },
        ];
        broadcastVideoRooms();
    }
};
const videoRoomLeaveHandler = (socket, data) => {
    const { roomId } = data;
    if (videoRooms[roomId]) {
        videoRooms[roomId].participants = videoRooms[roomId].participants.filter((participant) => participant.socketId !== socket.id);
    }
    if (videoRooms[roomId].participants.length > 0) {
        // emit an event to the user which is in the room that he should also close his peer connection
        socket
            .to(videoRooms[roomId].participants[0].socketId)
            .emit('video-call-disconnect');
    }
    if (videoRooms[roomId].participants.length < 1) {
        delete videoRooms[roomId];
    }
    broadcastVideoRooms();
};
const removeOnlineUser = (socketId) => {
    if (onlineUsers[socketId]) {
        delete onlineUsers[socketId];
    }
};
const checkIfUserIsInCall = (socket) => {
    Object.entries(videoRooms).forEach(([key, value]) => {
        let val = value;
        const participant = val.participants.find((participant) => participant.socketId === socket.id);
        if (participant) {
            removeUserFromTheVideoRoom(socket.id, key);
        }
    });
};
const removeUserFromTheVideoRoom = (socketId, roomId) => {
    videoRooms[roomId].participants = videoRooms[roomId].participants.filter((participant) => participant.socketId !== socketId);
    // remove room if no participants left in the room
    if (videoRooms[roomId].participants.length < 1) {
        delete videoRooms[roomId];
    }
    else {
        // if still there is user in the room - inform him to clear his peer connection
        io.to(videoRooms[roomId].participant[0].socketId).emit('video-call-disconnect');
    }
    broadcastVideoRooms();
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
