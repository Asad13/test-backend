import config from '../configs/config';
import logger from './logger';

const terminator = (reason: string, isError = false): void => {
  const code = isError ? 1 : 0;
  if (isError) {
    logger.error(`[${reason}]: shuting down...`);
  } else {
    logger.info(`[${reason}]: Shutting down...`);
  }

  const timeout =
    process.env.FORCE_SHUTDOWN_TIMEOUT != null &&
    !isNaN(parseInt(process.env.FORCE_SHUTDOWN_TIMEOUT))
      ? parseInt(process.env.FORCE_SHUTDOWN_TIMEOUT)
      : 10000;

  // Force Shutdown the server if Graceful shutdown fails after 10s
  setTimeout(() => {
    logger.info('[SERVER FORCE SHUTDOWN]: forcing a shutdown with code 1');
    process.exit(1); // terminating the process
  }, timeout).unref();

  // Graceful Shutdown the server
  if (config.server != null) {
    config.server.close(() => {
      // close connection to all the databases, some file system, workers, etc..
      // Then exit the process
      logger.info(
        `[SERVER GRACEFUL SHUTDOWN]: server closed with code ${code}`
      );
      process.exit(code); // terminating the process
    });
  } else {
    logger.info('[SERVER NOT FOUND]: terminating with code 1');
    process.exit(1); // terminating the process
  }
};

export default terminator;
