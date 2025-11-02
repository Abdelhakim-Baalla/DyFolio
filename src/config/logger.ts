import winston from 'winston';
import path from 'path';

// Configuration simple de Winston
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return stack 
        ? `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`
        : `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    // Console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      )
    }),
    // Fichier pour toutes les logs
    new winston.transports.File({ 
      filename: path.join('logs', 'app.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Fichier pour les erreurs uniquement
    new winston.transports.File({ 
      filename: path.join('logs', 'error.log'),
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});

export default logger;
