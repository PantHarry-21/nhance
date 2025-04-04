import express from 'express';
import {
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getBillingHistory,
  getCommissions,
} from '../controllers/billingController.js';

const router = express.Router();

// === Coupon Routes ===
router.get('/coupons', getAllCoupons);             // ✅ Get all coupons
router.post('/coupons', createCoupon);             // ✅ Create new coupon
router.put('/coupons/:id', updateCoupon);          // ✅ Update coupon by ID
router.delete('/coupons/:id', deleteCoupon);       // ✅ Delete coupon by ID

// === Billing Routes ===
router.get('/history', getBillingHistory);         // ✅ Get all completed bookings (billing history)
router.get('/commissions', getCommissions);        // ✅ Get commissions data

export default router;
