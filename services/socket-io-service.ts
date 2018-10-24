import SocketIO = require("socket.io");
import { IMeasure } from "../models/interface/measure";
import { Subscriber, Subject } from "rxjs";
import { measureRepository } from "../models/database/repository/implementation/mongoose4/measure-repository";
import { Server } from "http";

export class SocketIOService {

    private io: SocketIO.Server;
    private lastMeasure$: Subject<IMeasure>;

    constructor(server: Server) {
        this.io = SocketIO(server);
        this.lastMeasure$ = new Subject();
    }

    emitLastMeasure(measure: IMeasure) {
        this.lastMeasure$.next(measure);
    }

    listen() {
        const namespaceStr = '/measures/last-measures';
        const namespace = this.io.of(namespaceStr);
        namespace.on('connection', socket =>  {

            socket.on('subscribe', data => {
                const roomName = data.room ? data.room : '';

                if (roomName === 'all-room') {
                    socket.join(roomName);
                    // Create an observer
                    const observer = new Subscriber(
                        (lastMeasure: IMeasure) => {
                            namespace.to(roomName)
                                .emit('last-measures', lastMeasure);
                            console.log('emitting new measure in ' + roomName);
                        }
                    );
                    // Subscribe the observer into the lastMeasure$
                    const susbscrition = this.lastMeasure$.subscribe(observer);
                    // Find all the 'last measures' and emit them
                    measureRepository.findAll()
                    .then(measures => {
                        if (measures.length) {
                            console.log('New connection...');
                            this.emitLastMeasure(measures[0]);
                        }
                    });

                    // Unsubscribe the observer in case of disconnection
                    socket.on('disconnect', reason => {
                        console.log('socket disconnected');
                        susbscrition.unsubscribe();
                    });
                }
            });

            socket.on('unsubscribe', data =>
            {
                if(data.room) {
                    socket.leave(data.room);
                }
            });
        });
    }
}
