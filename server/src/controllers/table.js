const express = require('express');
const router = express.Router();
const db = require('../config/db');

module.exports = (app) => {
  app.use('/api', router);
};

router.get('/test', async (req, res) => {
  return res.status(200).send({ message: 'Table api' });
});

router.get('/areas', (req, res) => {
  db.query('SELECT * FROM areas', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).json(results);
  });
});

router.post('/areas', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.send({ error: true, message: 'Area Name missing' })
  }
  db.query('INSERT INTO areas (name, description) VALUES (?, ?)',
    [name, description], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(201).send({ id: result.insertId, name, description });
    });
});

router.put('/areas/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name) {
    return res.send({ error: true, message: 'Area Name missing' })
  }
  db.query('UPDATE areas SET name = ?, description = ? WHERE id = ?',
    [name, description, id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: 'Area not found' });
      }
      return res.status(200).send({ id, name, description });
    });
});

router.get('/areas/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM areas WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'Area not found' });
    }
    return res.status(200).send(results[0]);
  });
});

router.delete('/areas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM areas WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Area not found' });
    }
    return res.status(200).send({ message: 'Area deleted' });
  });
});

router.get('/tables', (req, res) => {
  db.query('SELECT * FROM tables', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).json(results);
  });
});

router.post('/tables', (req, res) => {
  const { name, persons, description, areaId } = req.body;
  if (!name || !persons || !areaId) {
    return res.send({ error: true, message: 'Area Name or persons or areaId missing' });
  }
  db.query('INSERT INTO tables (name, persons, description, areaId) VALUES (?, ?, ?, ?)',
    [name, persons, description, areaId], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(201).send({ id: result.insertId, name, persons, areaId });
    });
});

router.put('/tables/:id', (req, res) => {
  const { id } = req.params;
  const { name, persons, description, areaId } = req.body;
  if (!name || !persons || !areaId) {
    return res.send({ error: true, message: 'Area Name or persons or areaId missing' });
  }
  db.query('UPDATE tables SET name = ?, persons = ?, description = ?, areaId = ? WHERE id = ?',
    [name, persons, description, areaId, id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: 'Table not found' });
      }
      return res.status(200).send({ id, name, persons, description, areaId });
    });
});

router.get('/tables/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM tables WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'Table not found' });
    }
    return res.status(200).send(results[0]);
  });
});

router.delete('/tables/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tables WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Table not found' });
    }
    return res.status(200).send({ message: 'Table deleted' });
  });
});
