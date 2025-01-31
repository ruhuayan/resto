const express = require('express');
const router = express.Router();
const config = require('../config/config');
const utils = require('../config/utils');
const db = require('../config/db');

module.exports = (app) => {
	app.use('/api/users', router);
};

router.get('/test', async (req, res) => {
	return res.status(200).send({ message: 'User api' });
});

router.get('', async (req, res) => {
	db.query('SELECT * FROM users', (err, results) => {
		if (err) {
			return res.status(500).send(err);
		}

		const usersWithouthash = results.map(u => ({ id: u.id, username: u.name, role: u.role, email: u.email, createdAt: u.createdAt }));
		return res.status(200).json(usersWithouthash);
	});
});

router.post('/register', async (req, res) => {
	const name = req.body?.name?.trim();
	const email = req.body?.email?.trim();
	const password = req.body?.password?.trim();
	const role = req.body?.role?.trim() ?? 'USER';

	if (name?.length < 6 || password?.length < 6) {
		return res.json({
			error: true,
			message: 'User Name or Password must be over 6 chars',
		});
	}

	if (!(/\S+@\S+\.\S+/gi).test(email)) {
		return res.json({
			error: true,
			message: 'Email invalid',
		});
	}

	const salt = utils.getSalt();
	// Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
	const hash = utils.getHash(password, salt);

	db.query('INSERT INTO users (name, email, role, salt, hash) VALUES (?, ?, ?, ?, ?)',
		[name, email, role, salt, hash], (err, result) => {
			if (err) {
				return res.status(500).send({ message: err?.sqlMessage, code: err?.code });
			}
			return res.status(201).send({ id: result.insertId, name, email });
		});
});

router.post('/login', async (req, res) => {
	const name = req.body?.name?.trim();
	const password = req.body?.password?.trim();

	if (!name || !password) {
		return res.send({ error: true, message: 'Missing User Name or Password' });
	}

	db.query('SELECT * FROM users WHERE name = ?', [name], (err, results) => {
		if (err) {
			return res.status(500).send(err);
		}
		if (results.length === 0) {
			return res.status(404).send({ message: 'User not found' });
		}

		const user = results[0]; // console.log(user, password)
		const hash = utils.getHash(password, user.salt);
		if (user.hash !== hash) {
			return res.status(404).send({ message: 'User Name or Password do not match' });
		}

		const token = utils.signJwt({ id: user.id, name, role: user.role }, config.jwt.secret, {
			expiresIn: '1h',
			notBefore: '0', // Cannot use before now, can be configured to be deferred.
			algorithm: 'HS256',
			audience: config.jwt.audience,
			issuer: config.jwt.issuer
		});
		return res.status(200).send({ token, name, role: user.role });
	});
});

router.post('/change-password', [utils.checkJwt, utils.checkRole(['USER', 'ADMIN'])], async (req, res) => {
	const name = req.body?.name?.trim();
	const password = req.body?.password?.trim();
	const newPassword = req.body?.newPassword?.trim();

	if (newPassword?.length < 6) {
		return res.json({
			error: true,
			message: 'Password must be over 6 chars',
		});
	}
	if (newPassword.trim() === password.trim()) {
		return res.json({
			error: true,
			message: 'New Password must be different from Old password',
		});
	}

	const user = req.user;
	const hash = utils.getHash(password, user.salt);
	if (user.hash !== hash) {
		return res.status(404).send({ message: 'User Name or Password do not match' });
	}

	const newHash = utils.getHash(newPassword, user.salt);
	db.query('UPDATE users SET hash = ?', [newHash], (err, result) => {
		if (err) {
			return res.status(500).send(err);
		}
		if (result.affectedRows === 0) {
			return res.status(404).send('User not found');
		}
		return res.status(200).send({ id, name, email });
	});
});

// router.post('/forgot-password', async (req, res) => {
// 	const email = req.body?.email?.trim();

// 	if (!(/\S+@\S+\.\S+/gi).test(email)) {
// 		return res.json({
// 			error: true,
// 			message: 'Email invalid',
// 		});
// 	}
// 	const user = await User.findOne({ email });
// 	if (!user) {
// 		return res.status(400).json({
// 			error: true,
// 			message: 'Email does not exist',
// 		});
// 	}
// 	// todo send link to email
// 	return res.status(201).send({
// 		message: "Email sent"
// 	});
// });
