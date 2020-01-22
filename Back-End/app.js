const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const passport = require('passport');
const authenticate = require('./Services/authentication');
const routes = require('./Routes/index');
const MongoConnect = require('./MongoDB/index');
const util = require('./Utils/index');
const logger = require('./Services/logger');

require('./services/passport')(passport);
//Initialize express to app
var app = express();
const env = process.env.NODE_ENV || 'development';

//Enable CORS
app.use(function (req, res, next) {
    let origin = req.headers.origin;
    res.header("Access-Control-Allow-Origin", req.headers.host.indexOf("localhost") > -1 ? "http://localhost:3000" : origin);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

//Multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage });
app.use(upload.any());

//Static path
app.use(express.static(path.join(__dirname, 'public')));

//cookie parser
app.use(cookieParser('renters'));

// Parse
app.use(bodyparser.json({ limit: '50mb', extended: true }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

// Express Session
var sess = {
    key: 'user_sid',
    secret: 'RentersSecretKey',
    resave: true,
    rolling: true, //The expiration is reset to the original maxAge, resetting the expiration countdown.
    saveUninitialized: false,
    cookie: { path: "/", maxAge: 1000 * 60 * 60 * 24 * 7, secure: false }
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', authenticate, routes);


//DB Initializae
let mongoConnect = new MongoConnect(env);
mongoConnect.init();

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    //Function to change string into mangoose objectId
    String.prototype.toObjectId = function () {
        var ObjectId = (require('mongoose').Types.ObjectId);
        return ObjectId(this.toString());
    }

    // Create required directory
    util.createRequiredDirectories('./logs');

    console.log('server started on PORT ' + PORT);
});

process.on('unhandledRejection', error => {
    logger.log({
        level: 'info',
        message: error
    });
});

process.on('uncaughtException', (error) => {
    logger.log({
        level: 'info',
        message: error
    });
});

module.exports = app;