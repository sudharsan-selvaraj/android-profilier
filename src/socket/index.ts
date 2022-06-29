import { Socket } from 'socket.io';
import { Server } from 'http';
import { Server as IO } from 'socket.io';
import { Dependencies } from '../constants';
import { EventEmitter } from 'stream';
import Container from 'typedi';
import { SocketController } from './controller';
import { Profiling } from '../models/profiling';
import { DeviceTracker } from '../device-tracker';
import { Device } from '../types';
import { SessionModal } from '../models';

class SocketServer {
  private static instance: SocketServer;
  private io: IO;
  private sessionEventEmitter: EventEmitter;
  private controllers: Map<string, SocketController> = new Map();
  private deviceTracker!: DeviceTracker;

  private constructor(httpServer: Server) {
    this.sessionEventEmitter = Container.get(
      Dependencies.SESSION_EVENT_EMITTER
    );
    this.deviceTracker = Container.get(Dependencies.DEVICE_TRACKER);
    this.io = new IO(httpServer);
    this.io.on('connection', this.onConnection.bind(this));
    this.io.on('disconnect', this.onConnection.bind(this));

    this.sessionEventEmitter.on(
      'profiling_data',
      this.onProfilingDataRecieved.bind(this)
    );
    this.sessionEventEmitter.on(
      'battery_stats',
      this.onBatteryStatsRecieved.bind(this)
    );
    this.sessionEventEmitter.on(
      'session_completed',
      this.onSessionCompleted.bind(this)
    );
    this.deviceTracker.onDeviceRemoved(async (device: Device) => {
      await SessionModal.update(
        {
          completed: true,
        },
        {
          where: {
            device_udid: device.udid,
            completed: false,
          },
        }
      );
      this.io.emit('devices', {
        devices: this.deviceTracker.getDevices(),
      });
    });
    this.deviceTracker.onDeviceAdded(async (device: Device) => {
      this.io.emit('devices', {
        devices: this.deviceTracker.getDevices(),
      });
    });
  }

  public static initialize(httpServer: Server) {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer(httpServer);
    }
    return SocketServer.instance;
  }

  public onConnection(socket: Socket) {
    this.controllers.set(socket.id, new SocketController(socket));
    socket.emit('devices', {
      devices: this.deviceTracker.getDevices(),
    });
  }

  public onSocketDisconnect(socket: Socket) {
    this.controllers.delete(socket.id);
  }

  private async onProfilingDataRecieved(message: { session: any; data: any }) {
    const { session, data } = message;
    try {
      await Profiling.create({
        ...data,
        session_id: session.id,
      });
    } catch (err) {
      console.log(err);
    }
    this.io.to(session.uuid).emit('profiling_data', data);
  }

  private onBatteryStatsRecieved(message: { sessionId: string; battery: any }) {
    const { sessionId, battery } = message;
    this.io.to(sessionId).emit('battery_data', battery);
  }

  private onSessionCompleted(message: { sessionId: string }) {
    const { sessionId } = message;
    this.io.to(sessionId).emit('session_completed');
  }
}

export { SocketServer };
