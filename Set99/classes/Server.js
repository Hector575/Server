"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enviroment_1 = require("../global/enviroment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = enviroment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
        this.passIOtoRoutes();
    }
    static get instance() {
        return this._intance || (this._intance = new this());
    }
    escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            console.log('Cliente conectado');
        });
        this.io.on('notification', (e) => {
            console.log(e);
        });
    }
    passIOtoRoutes() {
        // esta función te va servir para pasar io a tus controllers o routes
        this.app.use((req, res, next) => {
            req.io = this.io;
            next();
        });
    }
    start(callback) {
        this.httpServer.listen(this.port, callback());
    }
}
exports.default = Server;
