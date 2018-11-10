import SocketIO = require("socket.io");
import { Server } from "http";
import { PumpsSIOService } from "./pumps-sio.service";
import { SensorsSIOService } from "./sensors-sio.service";

export class SocketIOService {

    pumpsSIOService: PumpsSIOService;
    sensorsSIOService: SensorsSIOService;

    private io: SocketIO.Server;

    constructor(server: Server) {
        this.io = SocketIO(server);
        this.pumpsSIOService = new PumpsSIOService(this.io);
        this.sensorsSIOService = new SensorsSIOService(this.io);
    }

    listen() {
        this.pumpsSIOService.listen();
        this.sensorsSIOService.listen();
    }
}
