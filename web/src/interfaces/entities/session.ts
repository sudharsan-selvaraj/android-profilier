export interface Session {
  id: number;
  uuid: string;
  name: string;
  app_bundle_id: string;
  device_udid: string;
  device_name: string;
  device_version: string;
  device_total_cpu: number;
  device_total_ram: number;
  completed: boolean;
  is_real_device: boolean;
}
