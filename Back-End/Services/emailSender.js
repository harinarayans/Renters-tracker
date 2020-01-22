const nodemailer = require('nodemailer');

module.exports = {
    resolveTags: function (text, tags) {
        if (text) {
            for (var o in tags) {
                text = text.replace(new RegExp('{' + o + '}', 'g'), tags[o]);
            }
        }
        return text
    },
    sendEmailNotification: function (options) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dhananjaysharma.me@gmail.com',
                pass: 'Aditya@1993'
            }
        });

        let mailOptions = {
            from: 'dhananjaysharma.me@gmail.com',
            to: options.to // sender address
        };

        mailOptions.html = this.resolveTags(options.template.Body, options.tags);
        mailOptions.subject = this.resolveTags(options.template.Subject, options.tags);
        return transporter.sendMail(mailOptions);
    }
}