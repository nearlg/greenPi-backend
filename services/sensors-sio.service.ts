import { Subscriber } from "rxjs";

import { measureRepository } from "@/repositories";
import { SIOService } from "@/services/sio.service";
import { Measure } from "@/models/interface/measure";

const enum NamespaceNames {
  LastMeasures = "/sensors/last-measures"
}

const enum EventNames {
  LastMeasures = "last-measures",
  GetLastMeasures = "get-last-measures"
}

export class SensorsSIOService implements SIOService {
  private io: SocketIO.Server;
  private lastMeasure$: Subscriber<Measure>;

  constructor(io: SocketIO.Server) {
    this.io = io;
    this.setUpSubscribers();
  }

  emitLastMeasure(measure: Measure): Promise<Measure> {
    this.lastMeasure$.next(measure);
    return Promise.resolve(measure);
  }

  listen() {
    this.listenLastMeasures();
  }

  private setUpSubscribers() {
    // Last pump historicals subscriber
    const namespace = this.io.of(NamespaceNames.LastMeasures);
    this.lastMeasure$ = new Subscriber(o => {
      namespace.emit(EventNames.LastMeasures, [o]);
    });
    // Other subscriber here
  }

  private listenLastMeasures() {
    // Create the namespace
    const namespace = this.io.of(NamespaceNames.LastMeasures);
    // Listen any new connection for that namespace
    namespace.on("connection", socket => {
      // Set the events here.

      // 'EventNames.GetLastMeasures' event gets all the
      // last measures explicitycally
      socket.on(EventNames.GetLastMeasures, data => {
        // if there is any sensor id,
        // it gets all the sensor id's from the system
        return new Promise(resolve => {
          let sensorIds: string[] = data.sensorIds || [];
          if (!Array.isArray(sensorIds)) {
            sensorIds = [];
          }
          resolve(measureRepository.findLastsBySensorIds(sensorIds));
        }).then(measures => {
          socket.emit(EventNames.LastMeasures, measures);
        });
      });
    });
  }
}
