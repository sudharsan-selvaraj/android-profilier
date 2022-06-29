import yargs from 'yargs/yargs';
import * as os from 'os';
import * as path from 'path';
let cacheDirectory = path.join(os.homedir(), '.cache', 'android-app-profiling');

const parsedArgs = yargs(process.argv.slice(2))
  .options({
    port: {
      alias: 'p',
      description: 'Port to start the grid server',
      default: 3000,
    },
  })
  .parseSync();

export interface AppConfiguration {
  port: number;
  databasePath: string;
}

export default {
  port: parsedArgs['port'],
  databasePath: `${cacheDirectory}`,
} as AppConfiguration;
