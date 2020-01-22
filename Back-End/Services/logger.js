const { createLogger, format, transports } = require('winston');
const { combine, timestamp, level, prettyPrint } = format;
require('winston-daily-rotate-file');

var logger = createLogger({
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new (transports.DailyRotateFile)({
            filename: './logs/renters-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '10m',
            maxFiles: '14d'
        })
    ],
    exitOnError: false
});

module.exports = logger;