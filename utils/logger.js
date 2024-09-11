// logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, prettyPrint } = format;
require('winston-daily-rotate-file');

const logFileTransport = new transports.DailyRotateFile({
  filename: 'logs/user-actions-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '3d',
});

const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json()
  ),
  transports: [
    logFileTransport,
    new transports.Console()
  ]
});

module.exports = logger;
