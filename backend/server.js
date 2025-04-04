import express from 'express';
import cors from 'cors';
import registerRoutes from './routes/index.js';
import fileUpload from 'express-fileupload';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

registerRoutes(app); // ✅ This must be called

app.get('/', (req, res) => {
  res.send('NHance backend is running');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
