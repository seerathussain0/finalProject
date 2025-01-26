import express from 'express';
import { createLoanRequest, getLoanDetails, updateLoanStatus } from '../controllers/loan.controllers.js';
import authenticateUser from '../middleware/auth.middleware.js';

const router = express.Router();

// Create a new loan request
router.post('/create',  createLoanRequest);

// Get loan details for a specific user
router.get('/details/:userId',  getLoanDetails);

// Update loan status (for admins)
router.put('/update-status',  updateLoanStatus);

export default router;
