const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const db = require('./databaseControl'); // dbControl yerine doğrudan databaseControl kullanıyoruz

const app = express();
app.use(bodyParser.json());

// Kullanıcı kaydı (register)
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Hashing error' });
    }

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hash], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(200).json({ message: 'User registered' });
    });
  });
});

// Kullanıcı girişi (login)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking password' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      res.status(200).json({ message: 'Login successful' });
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
