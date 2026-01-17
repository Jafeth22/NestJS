import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(port, () => {
  console.log(`Asset server running at http://localhost:${port}`);
}); 