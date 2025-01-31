
const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'dev';

const config = {
  dev: {
    root: rootPath,
    app: {
      name: 'Resto'
    },
    port: process.env.PORT || 3000,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    // gmail_password: process.env.GMAIL_PASSWORD,
    jwt: {
      // The secret is used to sign and validate signatures.
      secret: process.env.JWT_SECRET,
      // The audience and issuer are used for validation purposes.
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER
    },
  },
  production: {
    root: rootPath,
    app: {
      name: 'Resto'
    },
    port: process.env.PORT || 3000,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    jwt: {
      secret: process.env.JWT_SECRET,
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER
    },
  }
};

module.exports = config[env];
