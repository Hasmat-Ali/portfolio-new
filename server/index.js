require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const driveRoutes = require('./routes/drive');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/drive', driveRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'Portfolio Drive Server is up.',
    endpoints: {
      auth: {
        login: 'GET /auth/login — Start Google OAuth2 flow',
        callback: 'GET /auth/callback — OAuth2 callback (auto)',
        status: 'GET /auth/status — Check auth status',
      },
      drive: {
        download: 'GET /drive/download/:fileId — Download resume by file ID',
      },
    },
  });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  });
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio Drive Server running at http://localhost:${PORT}`);
  console.log(`\n📋 Setup steps:`);
  console.log(`   1. Fill in .env with your Google Cloud credentials`);
  console.log(`   2. Visit http://localhost:${PORT}/auth/login to authenticate`);
  console.log(`   3. Copy GOOGLE_REFRESH_TOKEN from console into .env`);
  console.log(`   4. Restart server — you're ready!\n`);
});


