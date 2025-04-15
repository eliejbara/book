const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Get all books
app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new book
app.post('/api/books', (req, res) => {
  const { title, author, metadata } = req.body;
  db.query('INSERT INTO books (title, author, metadata) VALUES (?, ?, ?)',
    [title, author, metadata],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, title, author, metadata, is_borrowed: false });
    }
  );
});

// Update a book
app.put('/api/books/:id', (req, res) => {
  const { title, author, metadata } = req.body;
  db.query('UPDATE books SET title = ?, author = ?, metadata = ? WHERE id = ?',
    [title, author, metadata, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  db.query('DELETE FROM books WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Update borrow status (check-in/check-out)
app.put('/api/books/:id/status', (req, res) => {
  const { is_borrowed } = req.body;
  db.query('UPDATE books SET is_borrowed = ? WHERE id = ?',
    [is_borrowed, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// Search books
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  db.query(
    'SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR metadata LIKE ?',
    [`%${q}%`, `%${q}%`, `%${q}%`],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
