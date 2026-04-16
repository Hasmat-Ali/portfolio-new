# Portfolio Drive Server

Express.js server with Google Drive API integration for resume upload/download.

## Setup

### 1. Google Cloud Console Setup

1. Go to [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Create a new project (e.g. `portfolio-resume`)
3. Go to **APIs & Services → Library** → Search **Google Drive API** → Enable it
4. Go to **APIs & Services → OAuth consent screen**
   - User Type: **External**
   - Fill App name, support email, developer email → Save
5. Go to **APIs & Services → Credentials**
   - Click **Create Credentials → OAuth 2.0 Client IDs**
   - Application type: **Web application**
   - Authorized redirect URIs: `http://localhost:5000/auth/callback`
   - Click **Create** → Copy **Client ID** and **Client Secret**

### 2. Google Drive Folder Setup

1. Go to [https://drive.google.com/](https://drive.google.com/)
2. Create a folder named `portfolio-resume`
3. Open the folder — copy the **Folder ID** from the URL:
   ```
   https://drive.google.com/drive/folders/THIS_IS_YOUR_FOLDER_ID
   ```

### 3. Configure .env

```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/callback
GOOGLE_DRIVE_FOLDER_ID=your_folder_id
GOOGLE_REFRESH_TOKEN=        # leave blank for now
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 4. Install & Run

```bash
cd server
npm install
npm start
```

### 5. Authenticate (One-time)

1. Open browser → visit `http://localhost:5000/auth/login`
2. Sign in with your Google account and allow permissions
3. Copy the `GOOGLE_REFRESH_TOKEN` printed in the server console
4. Paste it into `.env` as `GOOGLE_REFRESH_TOKEN=...`
5. Restart the server — done!

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Health check & endpoint list |
| GET | `/auth/login` | No | Start Google OAuth2 flow |
| GET | `/auth/callback` | No | OAuth2 callback (auto) |
| GET | `/auth/status` | No | Check authentication status |
| POST | `/drive/upload` | Yes | Upload resume file |
| GET | `/drive/files` | Yes | List all files in Drive folder |
| GET | `/drive/download/:fileId` | No | Download file by ID |
| DELETE | `/drive/delete/:fileId` | Yes | Delete file by ID |

### Upload Resume (POST /drive/upload)

```bash
curl -X POST http://localhost:5000/drive/upload \
  -F "resume=@/path/to/resume.pdf"
```

Response:
```json
{
  "success": true,
  "file": {
    "id": "1abc...",
    "name": "resume.pdf",
    "downloadLink": "http://localhost:5000/drive/download/1abc..."
  }
}
```

### Download Resume (GET /drive/download/:fileId)

```
http://localhost:5000/drive/download/YOUR_FILE_ID
```

Use this URL in the portfolio `resumeUrl` field.
