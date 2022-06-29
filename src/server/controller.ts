import { Dependencies } from '../constants';
import { EventEmitter } from 'events';
import Container from 'typedi';
import { Request, Response } from 'express';
import { SessionModal } from '../models/sessions';
import { DeviceType, IDeviceManager } from '../types';
import { Op } from 'sequelize';

class RestController {
  private apiEventEmitter: EventEmitter;
  private deviceManager: IDeviceManager;

  constructor() {
    this.apiEventEmitter = Container.get(Dependencies.API_EVENT_EMITTER);
    this.deviceManager = Container.get(Dependencies.DEVICE_TRACKER);
  }

  public async getAllSessions(request: Request, response: Response) {
    const { name, deviceName, version, appBundleId } = request.query;
    const filter = {} as any;
    if (name) {
      filter['name'] = {
        [Op.iLike]: `%${name}%`,
      };
    }
    if (deviceName) {
      filter['device_name'] = deviceName;
    }
    if (version) {
      filter['device_version'] = version;
    }
    if (appBundleId) {
      filter['app_bundle_id'] = appBundleId;
    }

    try {
      const sessions = await SessionModal.findAll({
        where: filter,
      });
      return response.status(200).send({
        success: true,
        data: sessions,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).send({
        success: true,
        error: err,
      });
    }
  }

  public async createNewSession(request: Request, response: Response) {
    try {
      const { sessionName, deviceUdid, bundleId } = request.body;
      if (!sessionName || !deviceUdid || !bundleId) {
        return response.status(400).json({
          success: false,
          message: 'sessionName, deviceUdid and bundleId are mandatory',
        });
      }

      const device = this.deviceManager.getDevice(deviceUdid);
      if (!device) {
        return response.status(400).json({
          success: false,
          message: `Device with id ${deviceUdid} not exists`,
        });
      }

      const session = await SessionModal.create<SessionModal>({
        name: sessionName,
        device_name: device.name,
        device_udid: device.udid,
        start_time: new Date(),
        completed: false,
        device_version: device.version,
        app_bundle_id: bundleId,
        is_real_device: device.type == DeviceType.REAL,
        device_total_cpu: device.total_cpu,
        device_total_ram: `${device.total_ram}`,
      } as SessionModal);

      return response.status(200).send({
        success: true,
        data: session,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).send({
        success: true,
        error: err,
      });
    }
  }
}

export { RestController };
