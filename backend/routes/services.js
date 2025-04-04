import express from 'express';
import multer from 'multer';
import {
  getServices,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/services', getServices);
router.post('/services', upload.single('image'), createService);
router.put('/services/:id', upload.single('image'), updateService);
router.delete('/services/:id', deleteService);

export default router;
