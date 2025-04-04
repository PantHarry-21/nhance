import express from 'express';
import authRoutes from './auth.js';
import categoryRoutes from './categories.js';
import serviceRoutes from './services.js';
import bookingRoutes from './booking.js';
import billingRoutes from './billing.js';
import userRoutes from './users.js';
import partnerRoutes from './partners.js';


export default function registerRoutes(app) {
  app.use('/api', authRoutes);            // Signup, Login, Auth
  app.use('/api/categories', categoryRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/booking', bookingRoutes);
  app.use('/api/billing', billingRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/partners', partnerRoutes);
}
