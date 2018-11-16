import SocketIO = require('socket.io');
import { Server } from 'http';
import { PumpsSIOService } from './pumps-sio.service';
import { SensorsSIOService } from './sensors-sio.service';

class SocketIOService {

    pumpsSIOService: PumpsSIOService;
    sensorsSIOService: SensorsSIOService;

    private io: SocketIO.Server;

    listen(server: Server) {
        if (!this.io) {
            this.io = SocketIO(server);
            this.pumpsSIOService = new PumpsSIOService(this.io);
            this.sensorsSIOService = new SensorsSIOService(this.io);
        }
        this.pumpsSIOService.listen();
        this.sensorsSIOService.listen();
    }
}

export const socketIOService = new SocketIOService();
