import { createLogger, format, transports } from 'winston';

const { 
  combine, 
  timestamp, 
  json, 
  simple, 
  colorize 
} = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
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