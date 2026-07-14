require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) console.error('DB connection failed:', err);
  else console.log('MySQL connected');
});

app.post('/api/bookings', (req, res) => {
  const { name, email, phone, eventType, message } = req.body;
  const sql = 'INSERT INTO bookings (name, email, phone, event_type, message) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, phone, eventType, message], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to save booking' });
    res.status(201).json({ message: 'Booking saved', id: result.insertId });
  });
});

app.get('/api/bookings', (req, res) => {
  db.query('SELECT * FROM bookings ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch bookings' });
    res.json(results);
  });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));