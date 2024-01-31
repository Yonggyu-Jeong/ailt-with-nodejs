const winston = require('winston');

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
    format: winston.format.combine(
      format.timestamp(), 
      // format.errors({ stack: true }), 
      logFormat
      // format.splat(), 
      // format.json()
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logfile.log' }) 
    ]
  });

module.exports = logger;
