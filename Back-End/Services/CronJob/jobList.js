const logger = require('./../logger');
/**
* @desc Start Procces of creattion facial gallery file.
*/
let pushNotification = () => {
    try {

    } catch (error) {
        logger.log({
            level: 'info',
            message: error
        });
    }
};

let jobs = [
    {
        "Name": "Push Notification",
        "Interval": "0 */1 * * *",
        "Action": pushNotification,
        "Options": {},
        "Priority": "normal",
        "Disabled": false
    }
];

module.exports = jobs;