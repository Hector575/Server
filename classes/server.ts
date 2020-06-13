import express from 'express'
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io'
import http from 'http'


export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
        this.passIOtoRoutes();
    }

    public static get instance() {
        return this._intance || ( this._intance = new this() );
    }


    private escucharSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            console.log('Cliente conectado');
        });

        this.io.on('notification', (e: any) => {
            console.log(e);
        })
    }

    private passIOtoRoutes() {
        // esta función te va servir para pasar io a tus controllers o routes

        this.app.use((req: any, res: any, next: any) => {
            req.io = this.io;
            next();
        })
    }

start( callback:Function ){

    this.httpServer.listen( this.port, callback());
}


}