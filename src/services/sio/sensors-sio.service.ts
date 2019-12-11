import { Subscriber } from 'rxjs';
import { SIOService } from './sio.service';
import { Measure } from '../../interfaces/entities/measure';
import { measureRepository } from '../../models/measure/repository';

const enum NamespaceNames {
  LastMeasures = '/sensors/last-measures'
}

const enum EventNames {
  LastMeasures = 'last-measures',
  GetLastMeasures = 'get-last-measures'
}

export class SensorsSIOService implements SIOService {
  private io: SocketIO.Server;
  private lastMeasure$: Subscriber<Measure>;

  constructor(io: SocketIO.Server) {
    this.io = io;
    this.setUpSubscribers();
  }

  async emitLastMeasure(measure: Measure): Promise<Measure> {
    this.lastMeasure$.next(measure);
    return measure;
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
    namespace.on('connection', socket => {
      // Set the events here.

      // 'EventNames.GetLastMeasures' event gets all the
      // last measures explicitycally
      socket.on(EventNames.GetLastMeasures, async data => {
        // if there is any sensor id,
        // it gets all the sensor id's from the system
        let sensorIds: string[] = data.sensorIds || [];
        if (!Array.isArray(sensorIds)) {
          sensorIds = [];
        }
        const measures = await measureRepository.findLastsBySensorIds(
          sensorIds
        );
        return socket.emit(EventNames.LastMeasures, measures);
      });
    });
  }
}
