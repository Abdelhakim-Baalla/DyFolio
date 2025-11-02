import logger from '../config/logger';

// Stream pour Morgan qui utilise Winston
export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  }
};
