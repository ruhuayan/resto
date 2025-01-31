const jwt = require('jsonwebtoken');
const config = require('./config');
const db = require('./db');
const _crypto = require('crypto');

const signJwt = (user) => {
  return jwt.sign({ userId: user.id, name: user.name, role: user.role },
    config.jwt.secret, {
    expiresIn: '1h',
    notBefore: '0', // Cannot use before now, can be configured to be deferred.
    algorithm: 'HS256',
    audience: config.jwt.audience,
    issuer: config.jwt.issuer
  });
}

const checkJwt = (req, res, next) => {
  const token = req.headers['authorization'];

  try {
    const payload = jwt.verify(token?.split(' ')[1], config.jwt.secret,
      {
        complete: true,
        audience: config.jwt.audience,
        issuer: config.jwt.issuer,
        algorithms: ['HS256'],
        clockTolerance: 0,
        ignoreExpiration: false,
        ignoreNotBefore: false
      });
    req.token = payload;
  } catch (err) {
    res.status(401)
      .json({ message: 'Missing or invalid token' });
    return;
  }
  next();
};

const checkRole = (roles) => {
  return async (req, res, next) => {
    // console.log(req.token?.payload.name)
    ddb.query('SELECT * FROM users where name = ?', [req.token?.payload.name], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results?.length === 0) {
        return res.status(401)
          .json({ message: 'User not found' });
      }
      const user = results[0];
      if (!roles.includes(user.role)) {
        return res.status(403)
          .json({ message: 'Not enough permissions' });
      }
      req.user = user;
      next();
    });
  }
};
const getSalt = () => _crypto.randomBytes(16).toString('hex');
const getHash = (password, salt) => {
  return _crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
}

module.exports = {
  signJwt,
  checkJwt,
  checkRole,
  getSalt,
  getHash,
}
