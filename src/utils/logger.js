import winston from 'winston';

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
    ]
});

export default logger