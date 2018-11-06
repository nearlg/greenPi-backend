import SocketIO = require("socket.io");
import { IMeasure } from "../models/interface/measure";
import { Subscriber } from "rxjs";
import { measureRepository } from "../models/database/repository/implementation/mongoose4/measure-repository";
import { Server } from "http";

const enum NamespaceStr {
    LastMeasures = '/measures/last-measures'
};

export class SocketIOService {

    private io: SocketIO.Server;
    private lastMeasure$: Subscriber<IMeasure>;

    constructor(server: Server) {
        this.io = SocketIO(server);
        this.setUpMeasureSubscriber();
    }

    emitLastMeasure(measure: IMeasure) {
        this.lastMeasure$.next(measure);
    }

    listen() {
        this.listenLastMeasures();
    }

    private listenLastMeasures() {
        // Create the namespace
        const namespace = this.io.of(NamespaceStr.LastMeasures);
        // Listen any new connection for that namespace
        namespace.on('connection', socket =>  {

            // 'get' event gets all the last measures explicitycally
            socket.on('get', data => {
                measureRepository.findAll()
                .then(measures => {
                    if (measures.length) {
                        socket.emit('last-measures', measures[0]);
                    }
                });
            });
        });
    }

    private setUpMeasureSubscriber() {
        if (!this.io) {
            return;
        }
        const namespace = this.io.of(NamespaceStr.LastMeasures);
        this.lastMeasure$ = new Subscriber(
            (lastMeasure: IMeasure) => {
                // Send the 'measures' to all sockets of the namespace
                namespace.emit('last-measures', lastMeasure);
            }
        );
    }
}
