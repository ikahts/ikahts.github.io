const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Setup server
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Database
const db = new sqlite3.Database('./activity_logs.db', (err) => {
  if (err) {
    console.error("Gagal membuka database:", err);
  } else {
    console.log("Database berhasil dibuka.");
  }
});

// Inisialisasi tabel log
db.run(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    details TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// API untuk menerima log aktivitas
app.post('/api/log', (req, res) => {
  const { type, details } = req.body;

  if (!type || !details) {
    return res.status(400).send("Data log tidak lengkap.");
  }

  const query = `INSERT INTO logs (type, details) VALUES (?, ?)`;
  db.run(query, [type, JSON.stringify(details)], (err) => {
    if (err) {
      console.error("Gagal menyimpan log:", err);
      res.status(500).send("Internal Server Error.");
    } else {
      res.send("Log berhasil disimpan.");
    }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});