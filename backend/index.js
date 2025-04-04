import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { authRoutes, profileRoutes } from './routes/index.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);              // Signup, Login
app.use('/api/profile', profileRoutes);   // Get/Update profile

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
