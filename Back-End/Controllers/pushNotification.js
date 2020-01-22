
const logger = require('../Services/logger');
const notificationModal = require('../Modals/pushNotification');

// Get Notification
pushNotification = async (notification) => {
    try {
        newNotification = new notificationModal(notification);
        newNotification.save(function (error, doc) {
            if (error) {
                logger.log({
                    level: 'info',
                    message: error
                });
            }
        })
    } catch (error) {
        logger.log({
            level: 'info',
            message: error
        });
    }
}

// Get Notification
getNotification = async (req, res) => {
    try {

    } catch (error) {
        logger.log({
            level: 'info',
            message: error
        });
    }
}


module.exports = {
    pushNotification,
    getNotification
}