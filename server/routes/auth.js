const express = require('express');
const router = express.Router();
const { getAuthUrl, getTokensFromCode } = require('../googleDrive');

// Step 1: Redirect user to Google OAuth2 consent screen
// Visit http://localhost:5000/auth/login in browser to start auth
router.get('/login', (req, res) => {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
});

// Step 2: Google redirects here with auth code
// Copy the refresh_token from console and paste into .env as GOOGLE_REFRESH_TOKEN
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ success: false, message: 'Authorization code missing.' });
  }

  try {
    const tokens = await getTokensFromCode(code);

    console.log('\n✅ Authentication successful!');
    console.log('📋 Copy this refresh_token into your .env file:\n');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);

    res.json({
      success: true,
      message: 'Authentication successful! Check server console for refresh_token.',
      note: 'Copy the GOOGLE_REFRESH_TOKEN from the server console into your .env file.',
      refresh_token: tokens.refresh_token || 'Already set — check console',
    });
  } catch (err) {
    console.error('Auth callback error:', err.message);
    res.status(500).json({ success: false, message: 'Authentication failed.', error: err.message });
  }
});

// Check auth status
router.get('/status', (req, res) => {
  const isAuth = !!process.env.GOOGLE_REFRESH_TOKEN &&
    process.env.GOOGLE_REFRESH_TOKEN !== 'your_refresh_token_here';

  res.json({
    authenticated: isAuth,
    message: isAuth
      ? 'Google Drive is authenticated and ready.'
      : 'Not authenticated. Visit /auth/login to authenticate.',
  });
});

module.exports = router;
