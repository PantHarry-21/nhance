import express from 'express';
import {
  sendQuotation,
  assignPartner,
  getCompletedBookings,
  getNewBookings,
  getActiveBookings,
} from '../controllers/bookingController.js';

const router = express.Router();

router.get('/new', getNewBookings);
router.get('/active', getActiveBookings);
router.get('/completed', getCompletedBookings);
router.post('/:id/quotation', sendQuotation);
router.post('/:id/assign-partner', assignPartner);

export default router;
