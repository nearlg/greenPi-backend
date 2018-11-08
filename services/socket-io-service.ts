import SocketIO = require("socket.io");
import { IMeasure } from "../models/interface/measure";
import { Subscriber } from "rxjs";
import { measureRepository } from "../models/database/repository/implementation/mongoose4/measure-repository";
import { Server } from "http";
import { IPumpHistorical } from "../models/interface/pump-historical";
import { pumpHistoricalRepository } from "../models/database/repository/implementation/mongoose4/pump-historical-repository";
import { sensorRepository } from "../models/database/repository/implementation/mongoose4/sensor-repository";
import { pumpRepository } from "../models/database/repository/implementation/mongoose4/pump-repository";

const enum NamespaceNames {
    LastMeasures = '/measures/last-measures',
    LastPumpHistoricals = '/pumps/last-historicals'
};

export class SocketIOService {

    private io: SocketIO.Server;
    private lastMeasure$: Subscriber<IMeasure>;
    private lastPumpHistoricals$: Subscriber<IPumpHistorical>;

    constructor(server: Server) {
        this.io = SocketIO(server);
        this.setUpMeasureSubscriber();
        this.setUpPumpHistoricalsSubscriber();
    }

    emitLastMeasure(measure: IMeasure): Promise<IMeasure> {
        this.lastMeasure$.next(measure);
        return Promise.resolve(measure);
    }

    emitLastPumpHistorical(pumpHistorical: IPumpHistorical): Promise<IPumpHistorical> {
        this.lastPumpHistoricals$.next(pumpHistorical);
        return Promise.resolve(pumpHistorical);
    }

    listen() {
        this.listenLastMeasures();
        this.listenLastPumpHistoricals();
    }

    private listenLastMeasures() {
        const eventName = 'last-measures';
        // Create the namespace
        const namespace = this.io.of(NamespaceNames.LastMeasures);
        // Listen any new connection for that namespace
        namespace.on('connection', socket =>  {

            // 'get' event gets all the last measures explicitycally
            socket.on('get', data => {

                // if there is any sensor id
                // it gets all the sensor id's from the system
                return Promise.resolve(data.sensorIds)
                .then(sensorIds => {
                    if (!Array.isArray(sensorIds) || !sensorIds.length) {
                        return sensorRepository.findAll()
                        .then(sensors => sensors.map(s => s.id));
                    }
                    return sensorIds;
                })
                .then(sensorIds => {
                    return measureRepository
                    .findLastsBySensorIds(sensorIds, data.gte, data.lte);
                })
                .then(measures => {
                    socket.emit(eventName, measures);
                });
            });
        });
    }

    private listenLastPumpHistoricals() {
        const eventName = 'last-pump-historicals';
        // Create the namespace
        const namespace = this.io.of(NamespaceNames.LastPumpHistoricals);
        // Listen any new connection for that namespace
        namespace.on('connection', socket =>  {

            // 'get' event gets all the last measures explicitycally
            socket.on('get', data => {

                // if there is any sensor id
                // it gets all the sensor id's from the system
                return Promise.resolve(data.pumpIds)
                .then(pumpIds => {
                    if (!Array.isArray(pumpIds) || !pumpIds.length) {
                        return pumpRepository.findAll()
                        .then(pumps => pumps.map(p => p.id));
                    }
                    return pumpIds;
                })
                .then(pumpIds => {
                    return pumpHistoricalRepository
                    .findLastsByPumpIds(pumpIds, data.gte, data.lte);
                })
                .then(historicalPumps => {
                    socket.emit(eventName, historicalPumps);
                });
            });
        });
    }

    private setUpMeasureSubscriber() {
        if (!this.io) {
            return;
        }
        const eventName = 'last-measures';
        const namespace = this.io.of(NamespaceNames.LastMeasures);
        this.lastMeasure$ = new Subscriber(
            o => {
                namespace.emit(eventName, [o]);
            }
        );
    }

    private setUpPumpHistoricalsSubscriber() {
        if (!this.io) {
            return;
        }
        const eventName = 'last-pump-historicals';
        const namespace = this.io.of(NamespaceNames.LastPumpHistoricals);
        this.lastPumpHistoricals$ = new Subscriber(
            o => {
                namespace.emit(eventName, [o]);
            }
        );
    }
}
