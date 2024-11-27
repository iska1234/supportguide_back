import express from 'express';
import { SERVER_PORT } from '../global/environments';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
// import orderReal from '../sockets/order_real';
// import * as socket from '../sockets/socketMap'

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: SocketIOServer;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = new SocketIOServer(this.httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true,
            },
        });

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        
        // this.io.on('connection', cliente => {
        //     //configuracion de mapas
        //     console.log('Cliente conectado')
        //     socket.mapaSockets(cliente, this.io)
        // });


        // orderReal(this.io);
    }

    public start(callback: () => void) {
        this.httpServer.listen(this.port, callback);
    }
}
