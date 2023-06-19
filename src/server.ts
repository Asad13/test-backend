/* eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import connectMongodb from './databases/connect-mongodb';
import setProcessEvents from './utils/process-events';
import config from './configs/config';
import logger from './utils/logger';
import { type Server } from 'http';

const init = async (): Promise<void> => {
  await connectMongodb();
};

let server: Server;

init()
  .then(() => {
    logger.info('Connected to all the resources...');

    const PORT = process.env.PORT ?? 3000;
    server = app.listen(PORT, (): void => {
      logger.info(`server listening on port ${PORT}`);
      console.log(`visit ${process.env.SERVER_URL ?? 'http://localhost:3000'}`);
      if (process.env.NODE_ENV === 'production' && process.send != null) {
        process.send('ready'); // Sending the ready signal to PM2
      }
    });

    server.on('error', (error: Error) => {
      logger.error(error.message);
    });

    config.server = server;
    setProcessEvents(); // set process events
  })
  .catch(() => {
    logger.error(`[RESOURCE CONNECTION ERROR]: shuting down...`);
    process.exit(1);
  });
