import ADB from 'appium-adb';
import { SessionModal } from './models/sessions';
import { EventEmitter } from 'stream';
import Container from 'typedi';
import { AppProfiler } from './app-profiler';
import { Dependencies } from './constants';

class SessionManager {
  private appProfiler: AppProfiler;

  constructor(
    private session: SessionModal,
    private deviceId: string,
    private profilingEventEmitter: EventEmitter
  ) {
    const adb: ADB = Container.get(Dependencies.ADB);

    this.appProfiler = new AppProfiler({
      adb: adb.executable,
      deviceUDID: deviceId,
      appPackage: session.app_bundle_id,
    });

    this.appProfiler.on('output', this.onLog.bind(this));
  }

  onLog(log: any) {
    this.profilingEventEmitter.emit('profiling_data', {
      session: this.session,
      data: log,
    });
  }

  async startLogging() {
    await this.appProfiler.startCapture();
  }

  async stopLogging() {
    await this.appProfiler.stopCapture();
  }
}

export { SessionManager };
