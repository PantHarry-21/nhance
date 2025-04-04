import express from 'express';
import {
  invitePartner,
  completePartnerSignup,
  getAllPartners,
  deletePartner,
  updatePartner,
} from '../controllers/partnerController.js';

const router = express.Router();

router.get('/', getAllPartners);
router.post('/invite', invitePartner);
router.post('/signup', completePartnerSignup);
router.delete('/:id', deletePartner);
router.put('/:id', updatePartner); // ✅ this is the missing line

export default router;
