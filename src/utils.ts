import _ from 'lodash';

export async function asyncForEach(
  array: string | any[],
  callback: {
    (device: any): Promise<void>;
    (udid: any): Promise<void>;
    (arg0: any, arg1: number, arg2: any): any;
  }
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
export function invokeCallback(cb: any, ...args: any) {
  if (cb && _.isFunction(cb)) {
    cb(args);
  }
}
