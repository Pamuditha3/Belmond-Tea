require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const { connectDB } = require('./config/db');
const { initJSONDb } = require('./data/dbFallback');
const apiRoutes = require('./routes/api');

const app = express();

// Attempt MongoDB; on failure the JSON fallback is used automatically
connectDB().then(() => {
  // Always initialise JSON db files so fallback is ready
  initJSONDb();
});

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ────────────────────────────────────────────────
app.use('/api', apiRoutes);

app.get('/api/status', (req, res) => {
  const { getMongoStatus } = require('./config/db');
  res.json({
    status: 'ok',
    message: 'Richard Tea API is online',
    db: getMongoStatus() ? 'mongodb' : 'json-fallback'
  });
});

// ── Production SPA serving ────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Richard Tea server running on http://localhost:${PORT}`)
);
