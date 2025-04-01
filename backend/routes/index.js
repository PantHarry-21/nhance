import express from "express";
import { invitePartner } from "../controllers/admin.js";
import { login } from "../controllers/auth.js";
import {
  createBooking,
  getUserBookings,
  updateBookingStatus,
} from "../controllers/bookings.js";
import {
  registerPartner,
  getAssignedJobs,
} from "../controllers/partner.js";

const router = express.Router();

// Auth
router.post("/login", login);

// Admin
router.post("/admin/invite-partner", invitePartner);

// Bookings
router.post("/bookings/create", createBooking);
router.get("/bookings/my/:email", getUserBookings);
router.put("/bookings/status", updateBookingStatus);

// Partner
router.post("/partner/register", registerPartner);
router.get("/partner/jobs/:email", getAssignedJobs);

export default router;
