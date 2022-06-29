export enum DeviceType {
  REAL = 'real',
  EMULATOR = 'emulator',
}

export enum Platform {
  ANDROID = 'android',
}
export interface Device {
  name: string;
  udid: string;
  platform: Platform;
  version: string;
  type: DeviceType;
  offline: boolean;
  busy: boolean;
  total_cpu: number;
  total_ram: number;
}

export interface IDeviceManager {
  getDevices(): Array<Device>;
  getDevice(deviceId: string): Device | undefined;
  onDeviceAdded(cb: (device: Device) => any): void;
  onDeviceRemoved(cb: (device: Device) => any): void;
}

export interface ILogListener {
  onProfilingData(data: any): void;
  onBatteryStats(data: any): void;
}
