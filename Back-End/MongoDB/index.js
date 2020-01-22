const mongoose = require('mongoose');

const RETRY_TIMEOUT = 5000;
mongoose.Promise = global.Promise
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoReconnect: true,
  keepAlive: 30000,
  poolSize: 1,
  reconnectInterval: RETRY_TIMEOUT,
  reconnectTries: Number.MAX_VALUE
}

let isConnectedBefore = false

class MongoConnect {
  constructor(env) {
    this._connectionString = env == 'development' ? 'mongodb://localhost:27017/Renters' : '';
    this._connect = () => {
      return mongoose.connect(this._connectionString, options).catch(err => console.error('Mongoose connect(...) failed with err: ', err))
    }
  }

  init() {
    this._connect();

    mongoose.connection.on('error', (err) => {
      console.error('Could not connect to MongoDB ' + err)
    })

    mongoose.connection.on('disconnected', () => {
      console.error('Lost MongoDB connection...')
      if (!isConnectedBefore) {
        setTimeout(() => this._connect(), RETRY_TIMEOUT)
      }
    })
    mongoose.connection.on('connected', () => {
      isConnectedBefore = true;
      console.info('Connection established to MongoDB')
    })

    mongoose.connection.on('reconnected', () => {
      console.info('Reconnected to MongoDB')
    })

    // For nodemon restarts
    process.once('SIGUSR2', () => {
      gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
      });
    });

    // Close the Mongoose connection, when receiving SIGINT
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.warn('Force to close the MongoDB connection after SIGINT')
        process.exit(0)
      })
    });

    // For Heroku app termination
    process.on('SIGTERM', () => {
      gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
      });
    });
  }
}
module.exports = MongoConnect;