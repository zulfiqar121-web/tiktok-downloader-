# 🎯 EXACT COMMANDS TO RUN

## Copy-Paste These Commands in Order

### Step 1: Navigate to Project (Copy & Paste)

```powershell
cd "C:\Users\MrLaptop\Desktop\tiktok downloader"
```

### Step 2: Install Dependencies (Copy & Paste)

```powershell
npm install
```

**Expected output:**
```
added 47 packages
...
```

**⏱️ Wait Time:** 1-2 minutes

### Step 3: Start Development Server (Copy & Paste)

```powershell
npm run dev
```

**Expected output:**
```
Ready! Available at http://localhost:3000
```

### Step 4: Open in Browser

Click this link (or copy to browser address bar):
```
http://localhost:3000
```

---

## ✅ You Should See

1. **Dark theme interface** with TikTok Downloader title
2. **Input field** for "Enter TikTok Video URL"
3. **Download button** (teal/cyan colored)
4. **Features section** showing: Fast Download, 100% Free, No Watermark, Secure
5. **Legal disclaimer** warning box

---

## 🧪 Test It

### Test 1: Try a Real TikTok URL

1. Copy this TikTok URL:
```
https://www.tiktok.com/@tiktok/video/7256519088906111498
```

2. Paste into input box on the website
3. Click **Download** button
4. Wait 2-3 seconds
5. You should see: **"✓ Video Ready"** with a download URL
6. Click **"📥 Download Video"** button
7. Your browser downloads an MP4 file ✅

### Test 2: Try Another URL

Use any public TikTok video:
1. Go to TikTok.com
2. Find any public video
3. Click share → Copy link
4. Paste into downloader
5. Click Download
6. Should work! ✅

### Test 3: Test Error Handling

1. Try an invalid URL: `https://google.com`
2. You should see error: **"Invalid TikTok URL"** ✅
3. Try private video URL
4. You should see error: **"Could not extract video information"** ✅

---

## 📡 Test Backend Directly (Advanced)

**Only if you want to test the API without the frontend**

Open **another PowerShell window** and run:

```powershell
curl "http://localhost:3000/api/download?url=https://www.tiktok.com/@tiktok/video/7256519088906111498"
```

**Expected response:**
```json
{
  "success": true,
  "url": "https://v16-web.tiktok.com/video/...",
  "title": "Example Video",
  "duration": 30
}
```

---

## 🚀 Deploy to Vercel (When Ready)

**IMPORTANT: Only do this after testing locally!**

### Option A: Deploy via GitHub (Recommended)

**Step 1:** Initialize Git
```powershell
git init
git add .
git commit -m "TikTok Downloader"
```

**Step 2:** Go to GitHub
- https://github.com/new
- Create new repository named `tiktok-downloader`
- Make it **Public**
- Create repository

**Step 3:** Connect your local repo to GitHub
```powershell
git remote add origin https://github.com/YOUR_USERNAME/tiktok-downloader.git
git branch -M main
git push -u origin main
```

**Step 4:** Deploy via Vercel
- Go to https://vercel.com/new
- Click "Import Project"
- Click "Continue with GitHub"
- Select `tiktok-downloader`
- Click "Import"
- Click "Deploy"

**Done!** Your site is live! 🎉

### Option B: Deploy via Vercel CLI

```powershell
npm install -g vercel
vercel
# Answer prompts
vercel --prod
```

---

## 🆘 If Something Goes Wrong

### "npm: The term 'npm' is not recognized"

**Install Node.js:**
1. Go to https://nodejs.org/
2. Download the latest LTS version
3. Run installer
4. Restart PowerShell
5. Try again

### "Cannot find module 'yt-dlp-exec'"

**Install dependencies:**
```powershell
npm install
```

### "Port 3000 already in use"

**Kill the process:**
```powershell
netstat -ano | findstr :3000
# Note the PID number (last column)
taskkill /PID <PID> /F
# Try npm run dev again
```

### "Scripts can't be run on this system"

**Fix PowerShell execution policy:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

---

## 📝 Important Commands Summary

| Command | What It Does |
|---------|-------------|
| `npm install` | Downloads all dependencies |
| `npm run dev` | Starts local development server |
| `npm run deploy` | Deploys to Vercel |
| `node test-local.js <URL>` | Tests backend API directly |

---

## 🔗 Important Links

| Purpose | Link |
|---------|------|
| Local Frontend | http://localhost:3000 |
| Local Backend | http://localhost:3000/api/download |
| Node.js Download | https://nodejs.org |
| Vercel Dashboard | https://vercel.com/dashboard |
| GitHub | https://github.com |
| TikTok (for test videos) | https://www.tiktok.com |

---

## ⏱️ Timeline

| Step | Time | Command |
|------|------|---------|
| Navigate | 5 sec | `cd "C:\Users\MrLaptop\Desktop\tiktok downloader"` |
| Install | 2 min | `npm install` |
| Start | 5 sec | `npm run dev` |
| Test | 5 min | Open browser, try URLs |
| **Total** | **~8 min** | **You're done!** |

---

## ✨ After It's Working

### Customize It

Edit `public/index.html` to:
- Change title
- Change colors
- Change button text
- Add more features

### Add Features

Edit `api/download.js` to:
- Add more metadata
- Add analytics
- Add caching
- Add rate limiting

### Monitor It

Check Vercel dashboard:
- Visit https://vercel.com/dashboard
- View analytics
- See error logs
- Monitor bandwidth

---

## 📞 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Stuck on "Installing..." | Wait 2-3 min or check internet |
| Port 3000 error | Run kill command above |
| Invalid URL error | Use correct format: `https://www.tiktok.com/@user/video/123` |
| Backend error | Close and restart `npm run dev` |
| Download doesn't work | Try another video URL |
| Can't deploy | Make sure GitHub repo is set up |

---

## 🎯 Success = 3 Things Working

1. ✅ **Local server runs** - See "Ready!" message
2. ✅ **Frontend loads** - Can open http://localhost:3000
3. ✅ **Can download** - Enter URL, get video

**If all 3 work = You're good!** 🎉

---

## 🚀 You're Ready

**Run these 3 commands:**

```powershell
cd "C:\Users\MrLaptop\Desktop\tiktok downloader"
npm install
npm run dev
```

**Then open:** http://localhost:3000

**Enjoy!** 🎉
