import {Appointment} from "../models/appointment.model.js"
import QRCode from 'qrcode'
import {Loan} from '../models/loan.model.js'

// Controller to create an appointment
export const createAppointment = async (req, res) => {
  try {
    const { loanId, appointmentDate, appointmentTime, location } = req.body;
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Generate unique token number for the appointment
    const tokenNumber = `APPT-${Date.now()}`;

    // Generate a QR code from the token number
    QRCode.toDataURL(tokenNumber, async (err, qrCodeUrl) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to generate QR code', error: err.message });
      }

      // Create the appointment
      const newAppointment = new Appointment({
        userId: loan.userId,
        loanId: loanId,
        tokenNumber: tokenNumber,
        qrCodeUrl: qrCodeUrl,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        location: location,
      });

      await newAppointment.save();

      // Return the appointment details along with the QR code
      res.status(201).json({
        message: 'Appointment created successfully',
        appointment: newAppointment,
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller to get all appointments for a user (or all appointments for admin)
export const getAppointments = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated and `req.user` is set

    const appointments = await Appointment.find({ userId: userId }).populate('loanId');

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found' });
    }

    res.status(200).json({
      message: 'Appointments retrieved successfully',
      appointments: appointments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller to update appointment status (for admin)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Scheduled', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update appointment status
    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: 'Appointment status updated successfully',
      appointment: appointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};