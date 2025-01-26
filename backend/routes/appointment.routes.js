import express from 'express'
import { createAppointment, getAppointments, updateAppointmentStatus } from '../controllers/appoinment.controllers.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router();

router.post('/', authMiddleware, createAppointment);

router.get('/', authMiddleware, getAppointments);

router.put('/:appointmentId', authMiddleware, updateAppointmentStatus);

export default router