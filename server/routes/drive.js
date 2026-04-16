const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Readable } = require('stream');
const { drive } = require('../googleDrive');
const authMiddleware = require('../middleware/auth');

// Multer — store file in memory (no disk write)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed.'));
    }
  },
});

// ─── UPLOAD ──────────────────────────────────────────────────────────────────
// POST /drive/upload
// Protected — requires GOOGLE_REFRESH_TOKEN in .env
// Body: multipart/form-data with field "resume"
router.post('/upload', authMiddleware, upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file provided.' });
  }

  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    // Convert buffer to readable stream
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    const response = await drive.files.create({
      requestBody: {
        name: req.file.originalname,
        mimeType: req.file.mimetype,
        parents: folderId ? [folderId] : [],
      },
      media: {
        mimeType: req.file.mimetype,
        body: bufferStream,
      },
      fields: 'id, name, webViewLink, webContentLink',
    });

    const file = response.data;

    // Make file publicly readable so anyone can download via link
    await drive.permissions.create({
      fileId: file.id,
      requestBody: { role: 'reader', type: 'anyone' },
    });

    console.log(`✅ Uploaded: ${file.name} (ID: ${file.id})`);

    res.json({
      success: true,
      message: 'Resume uploaded to Google Drive successfully.',
      file: {
        id: file.id,
        name: file.name,
        viewLink: file.webViewLink,
        downloadLink: `http://localhost:${process.env.PORT || 5000}/drive/download/${file.id}`,
      },
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ success: false, message: 'Upload failed.', error: err.message });
  }
});

// ─── LIST FILES ──────────────────────────────────────────────────────────────
// GET /drive/files
// Returns all files in the configured Drive folder
router.get('/files', authMiddleware, async (req, res) => {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const query = folderId ? `'${folderId}' in parents and trashed=false` : 'trashed=false';

    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name, mimeType, createdTime, size)',
      orderBy: 'createdTime desc',
    });

    res.json({ success: true, files: response.data.files });
  } catch (err) {
    console.error('List files error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to list files.', error: err.message });
  }
});

// ─── DOWNLOAD ────────────────────────────────────────────────────────────────
// GET /drive/download/:fileId
// Public — no auth required (file must be shared as "anyone can view")
router.get('/download/:fileId', async (req, res) => {
  const { fileId } = req.params;

  if (!fileId) {
    return res.status(400).json({ success: false, message: 'File ID is required.' });
  }

  try {
    // Get file metadata for filename
    const meta = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType',
    });

    const { name, mimeType } = meta.data;

    // Stream file content
    const fileStream = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.setHeader('Content-Type', mimeType);

    fileStream.data
      .on('error', (err) => {
        console.error('Download stream error:', err.message);
        res.status(500).json({ success: false, message: 'Download failed.' });
      })
      .pipe(res);
  } catch (err) {
    console.error('Download error:', err.message);
    const status = err.code === 404 ? 404 : 500;
    res.status(status).json({ success: false, message: 'File not found or download failed.', error: err.message });
  }
});

// ─── DELETE ──────────────────────────────────────────────────────────────────
// DELETE /drive/delete/:fileId
// Protected — requires auth
router.delete('/delete/:fileId', authMiddleware, async (req, res) => {
  const { fileId } = req.params;

  try {
    await drive.files.delete({ fileId });
    console.log(`🗑️ Deleted file: ${fileId}`);
    res.json({ success: true, message: 'File deleted successfully.' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ success: false, message: 'Delete failed.', error: err.message });
  }
});

module.exports = router;
