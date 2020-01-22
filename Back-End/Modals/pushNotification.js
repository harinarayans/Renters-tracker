const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pushNotificationSchema = new Schema({
    notification: { type: String },
    notificationDetails: { type: String },
    notificationType: { type: Number },
    isRead: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const PushNotification = mongoose.model('PushNotification', pushNotificationSchema, 'PushNotification');
module.exports = PushNotification;