import { createLogger, format, transports } from 'winston';
import { getDate } from '../utils/getDate';

const { 
  combine, 
  timestamp, 
  json, 
  simple, 
  colorize 
} = format;

const dateFormat = getDate();

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.File({ filename: `logs/error-${dateFormat}.log`, level: 'error' }),
    new transports.File({ filename: `logs/combined-${dateFormat}.log` }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      colorize(),
      simple()
    ),
  }));
}

export default logger;