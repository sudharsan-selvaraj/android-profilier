import { Device, DeviceType, IDeviceManager, Platform } from './types';
import Adb, { Client, Device as AdbDevice } from '@devicefarmer/adbkit';
import { EventEmitter } from 'events';
import ADB from 'appium-adb';
import _ from 'lodash';
import { asyncForEach } from './utils';

class DeviceTracker extends EventEmitter implements IDeviceManager {
  private deviceMap: Map<string, Device> = new Map();
  private tracker!: EventEmitter;

  private static instance: DeviceTracker;
  private adbClient: Client;

  private constructor(private adb: ADB) {
    super();
    this.adbClient = Adb.createClient({
      port: adb.getAdbServerPort(),
    });
  }

  onDeviceAdded(cb: (device: Device) => any): void {
    this.on('device_connected', cb);
  }

  onDeviceRemoved(cb: (device: Device) => any): void {
    this.on('device_removed', cb);
  }

  getDevices(): Device[] {
    return [...this.deviceMap.values()];
  }

  getDevice(deviceId: string): Device | undefined {
    return [...this.deviceMap.values()].find((d) => d.udid == deviceId);
  }

  public static async initialize(adb: ADB) {
    if (!DeviceTracker.instance) {
      DeviceTracker.instance = new DeviceTracker(adb);
      await DeviceTracker.instance.loadDevices();
    }
    return DeviceTracker.instance;
  }

  private async loadDevices() {
    this.tracker = await this.adbClient.trackDevices();
    this.tracker.on('add', this.newDeviceConnected.bind(this));
    this.tracker.on('remove', this.onDeviceDisconnected.bind(this));

    let connectedDevice = await this.adbClient.listDevices();
    await asyncForEach(connectedDevice, this.newDeviceConnected.bind(this));
  }

  private async newDeviceConnected(device: AdbDevice) {
    console.log('Device connect: ' + JSON.stringify(device, null, 2));
    await this.waitBootComplete(device.id);
    const [version, realDevice, name, total_cpu, total_mem] = await Promise.all(
      [
        this.getDeviceVersion(device.id),
        this.isRealDevice(device.id),
        this.getDeviceName(device.id),
        this.getTotalCpu(device.id),
        this.getTotalMemory(device.id),
      ]
    );

    const deviceDetails = {
      udid: device.id,
      version: version,
      name: name,
      platform: Platform.ANDROID,
      busy: false,
      offline: false,
      type: realDevice ? DeviceType.REAL : DeviceType.EMULATOR,
      total_cpu: total_cpu,
      total_ram: total_mem,
    };
    this.deviceMap.set(device.id, deviceDetails);
    this.emit('device_connected', deviceDetails);
  }

  private async onDeviceDisconnected(device: AdbDevice) {
    const removedDevice = JSON.parse(
      JSON.stringify(this.deviceMap.get(device.id))
    );
    this.deviceMap.delete(device.id);
    this.emit('device_removed', removedDevice);
    console.log('Device removed: ' + device.id);
  }

  private async waitBootComplete(udid: string) {
    return new Promise((res, rej) => {
      const interval = setInterval(async () => {
        try {
          await this.getDeviceProperty(udid);
          clearInterval(interval);
          res(true);
        } catch (err) {}
      }, 500);
    });
  }

  private async getDeviceVersion(udid: string) {
    return await this.getDeviceProperty(udid, 'ro.build.version.release');
  }

  private async getDeviceProperty(udid: string, prop?: string): Promise<any> {
    const args = ['-s', udid, 'shell', 'getprop'];
    if (prop) {
      args.push(prop);
    }
    return await this.adb.adbExec(args);
  }

  private async isRealDevice(udid: string): Promise<boolean> {
    const character = await this.getDeviceProperty(
      udid,
      'ro.build.characteristics'
    );
    return character !== 'emulator';
  }

  private getDeviceName = async (udid: string) => {
    const [emulatorName, deviceName] = await Promise.all([
      this.getDeviceProperty(udid, 'ro.kernel.qemu.avd_name'),
      this.getDeviceProperty(udid, 'ro.product.name'),
    ]);

    return _.isNull(emulatorName) || _.isEmpty(emulatorName)
      ? deviceName
      : emulatorName;
  };

  private async getTotalMemory(deviceId: string) {
    const args = ['-s', deviceId, 'shell', 'cat', '/proc/meminfo'];

    const res = (await this.adb.adbExec(args)) as any;
    let match = res.match(/MemTotal:.*[0-9]/g);
    if (match && match.length) {
      return match[0].replace(/[^0-9]/g, '');
    }
    return 0;
  }

  private async getTotalCpu(deviceId: string) {
    const args = ['-s', deviceId, 'shell', 'cat', '/proc/cpuinfo'];

    const res = (await this.adb.adbExec(args)) as any;
    return res.match(/processor/g)?.length;
  }
}

export { DeviceTracker };
