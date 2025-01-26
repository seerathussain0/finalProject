import express from "express";
import { getAllApplications, updateApplicationStatus, filterApplications } from "../controllers/adminController.js";
import adminAuthMiddleware from "../middleware/admin.auth.middleware.js";

const router = express.Router();

// GET /applications: View all loan applications
router.get("/applications", authMiddleware, getAllApplications);

// PUT /application/:id: Update application status
router.put("/application/:id", authMiddleware, updateApplicationStatus);

// GET /applications/filter: Filter applications by city or country
router.get("/applications/filter", authMiddleware, filterApplications);

export default router;