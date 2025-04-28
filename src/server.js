const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Ensure 'uploads' folder exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Root route
app.get('/', (req, res) => {
  res.send('PDF Extractor Backend is Running');
});

// Upload route
app.post('/upload', upload.single('pdfFile'), async (req, res) => {
  const pdfPath = req.file.path;

  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    const text = data.text;

    fs.unlinkSync(pdfPath); // Delete the uploaded PDF
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error reading PDF' });
  }
});

// OPTIONAL: Serve React build if you're using React
const clientBuildPath = path.join(__dirname, 'client', 'build');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
