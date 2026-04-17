const express = require('express');
const router = express.Router();
const { drive } = require('../googleDrive');

// GET /drive/download/:fileId
router.get('/download/:fileId', async (req, res) => {
  const { fileId } = req.params;

  try {
    const meta = await drive.files.get({ fileId, fields: 'name, mimeType' });
    const { name, mimeType } = meta.data;

    const fileStream = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.setHeader('Content-Type', mimeType);

    fileStream.data
      .on('error', () => res.status(500).json({ success: false, message: 'Download failed.' }))
      .pipe(res);
  } catch (err) {
    const status = err.code === 404 ? 404 : 500;
    res.status(status).json({ success: false, message: 'File not found or download failed.' });
  }
});

module.exports = router;
