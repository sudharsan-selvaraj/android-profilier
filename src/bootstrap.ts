import 'reflect-metadata';
import { ADB } from 'appium-adb';
import { Container } from 'typedi';
import { Dependencies } from './constants';
import { EventEmitter } from 'stream';
import { DeviceTracker } from './device-tracker';

export async function initialize() {
  try {
    const adb = await ADB.createADB();
    const deviceTracker = await DeviceTracker.initialize(adb);

    Container.set(Dependencies.ADB, adb);
    Container.set(Dependencies.DEVICE_TRACKER, deviceTracker);
    Container.set(Dependencies.SESSION_EVENT_EMITTER, new EventEmitter());
    Container.set(Dependencies.API_EVENT_EMITTER, new EventEmitter());
  } catch (err) {
    console.log(
      'Unable to find adb executable. Make sure android sdk is installed and ANDROID_HOME environment variable is configured correctly'
    );
    console.log(err);
    process.exit(1);
  }
}
