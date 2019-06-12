const config = require('config');
const winston = require('winston');

const logger = winston.createLogger({
  level: config.get('logger.level'),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { service: 'digital-paper-edit-audio-converter' },
  transports: [
    new winston.transports.File({
      filename: config.get('logger.error'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: config.get('logger.file'),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }));
}

module.exports = logger;
