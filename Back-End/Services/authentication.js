const util = require('../Utils/index');

module.exports = (req, res, next) => {
    if (util.publicUrl.indexOf(req.url) != -1) {
        return next();
    } else if (req.session && req.session.userData) {
        return next();
    } else {
        let response = {
            success: false,
            message: 'Unauthenticated.'
        }
        return res.status(401).send(response).end();
    }
}