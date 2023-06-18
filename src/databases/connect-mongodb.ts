import mongoose from 'mongoose';
import logger from '../utils/logger';
// import terminator from '../utils/terminator';

const connectMongodb = async (): Promise<void> => {
  try {
    if (process.env.MONGO_URI != null) {
      await mongoose.connect(process.env.MONGO_URI);
      logger.info('Connected to mongodb database...');
    } else {
      throw new Error('No mongodb uri variable is found in the environment');
    }
  } catch (error: any) {
    logger.error(error?.message);
    logger.error(`[MONGODB CONNECTION ERROR]: shuting down...`);
    process.exit(1);
  }
};

export default connectMongodb;
