"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const mountServer = () => {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    app.use((0, cors_1.default)());
    app.get('/', (req, res) => {
        res.send('hello world');
    });
    const io = new socket_io_1.Server(server, {
        allowEIO3: true,
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        console.log('user connected of the id: ' + socket.id);
    });
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
        console.log(`server running on port: ${port}`);
    });
};
mountServer();
