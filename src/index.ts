import { initialize } from './bootstrap';
import { getExpressApp } from './server/app';
import { SocketServer } from './socket';
import http from 'http';
import config from './config';
import { sequelizeLoader } from './db-loader';

(async () => {
  await initialize();
  await sequelizeLoader({ dbPath: config.databasePath });
  const app = getExpressApp();
  const httpServer = http.createServer(app);
  SocketServer.initialize(httpServer);

  httpServer.listen(config.port, () => {
    console.log('App Started on port ' + config.port);
  });
})();
