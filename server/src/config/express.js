const glob = require('glob');
const cors = require('cors');
const fs = require('fs');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'dev';
  app.locals.ENV = env;
  // logging
  if (env === 'dev') {
    app.use(logger('dev'));
  } else {
    const accessLogStream = fs.createWriteStream(__dirname + "/../../access.log", { flags: 'a' });
    app.use(logger('combined', { stream: accessLogStream }))
  }
  app.use(bodyParser.json());

  // cors
  const allowlist = env === 'dev' ? ['http://localhost:4200', 'http://ec2-3-22-234-193.us-east-2.compute.amazonaws.com', 'https://tankuze.com/']
    : ['https://tankuze.com/'];
  const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
  app.use(cors(corsOptionsDelegate));

  // connect database
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });

  const controllers = glob.sync(config.root + '/controllers/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
      title: 'error'
    });
  });

  return app;
};
