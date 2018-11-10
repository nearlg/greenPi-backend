import { Subscriber } from "rxjs";

import { IPumpHistorical } from "../models/interface/pump-historical";

import { pumpHistoricalRepository } from "../models/database/repository/implementation/mongoose4/pump-historical-repository";
import { SIOService } from "./sio-service";

const enum NamespaceNames {
    LastPumpHistoricals = '/pumps/last-historicals'
};

const enum EventNames {
    LastHistoricals = 'last-historicals',
    GetLastHistoricals = 'get-last-historicals'
};

export class PumpsSIOService implements SIOService {

    private io: SocketIO.Server;
    private lastPumpHistoricals$: Subscriber<IPumpHistorical>;

    constructor(io: SocketIO.Server) {
        this.io = io;
        this.setUpSubscribers();
    }

    emitLastPumpHistorical(pumpHistorical: IPumpHistorical): Promise<IPumpHistorical> {
        this.lastPumpHistoricals$.next(pumpHistorical);
        return Promise.resolve(pumpHistorical);
    }

    listen() {
        this.listenLastPumpHistoricals();
    }

    private setUpSubscribers() {
        // Last pump historicals subscriber
        const namespace = this.io.of(NamespaceNames.LastPumpHistoricals);
        this.lastPumpHistoricals$ = new Subscriber(
            o => {
                namespace.emit(EventNames.LastHistoricals, [o]);
            }
        );
        // Other subscriber here
    }

    private listenLastPumpHistoricals() {
        // Create the namespace
        const namespace = this.io.of(NamespaceNames.LastPumpHistoricals);
        // Listen any new connection for that namespace
        namespace.on('connection', socket =>  {
            // Set the events here.

            // 'EventNames.GetLastHistoricals' event gets all the
            // last pump historicals explicitycally
            socket.on(EventNames.GetLastHistoricals, data => {
                // if there is any pump id,
                // it gets all the pump id's from the system
                return new Promise(resolve => {
                    let pumpIds: string[] = data.pumpIds || [];
                    if (!Array.isArray(pumpIds)) {
                        pumpIds = [];
                    }
                    resolve(pumpHistoricalRepository
                    .findLastsByPumpIds(pumpIds));
                })
                .then(historicalPumps => {
                    socket.emit(EventNames.LastHistoricals, historicalPumps);
                });
            });

        });
    }
}
