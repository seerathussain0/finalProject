import { Loan } from '../models/loan.model.js';
import path from 'path';
import { qrCodeGenerator } from '../utils/qrCodeGenerator.js';
import { v4 as uuidv4 } from 'uuid';  // To generate unique filenames

// Create a new loan request
export const createLoanRequest = async (req, res) => {
  try {
    // Extract the userId from the authenticated user
    const { userId } = req.user || "abc"; // From authentication middleware

    const {
      loanAmount, category, subCategory, guarantor1, guarantor2, loanPeriod, initialDeposit,
      name, cnic, email, address, phone,
    } = req.body;

    // Ensure all required fields are present
    if (!loanAmount || !category || !subCategory || !guarantor1 || !guarantor2 || !loanPeriod || !initialDeposit || !name || !cnic || !email || !address || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Prepare guarantors array from form data
    const guarantors = [
      {
        name: guarantor1.name,
        email: guarantor1.email,
        location: guarantor1.location,
        cnic: guarantor1.cnic,
      },
      {
        name: guarantor2.name,
        email: guarantor2.email,
        location: guarantor2.location,
        cnic: guarantor2.cnic,
      }
    ];

    // Create a new loan request document
    const loanRequest = new Loan({
      userId, // Using the current user's ID
      name,
      cnic,
      email,
      address,
      phone,
      loanAmount,
      loanCategory: category,
      loanSubcategory: subCategory,
      loanPeriod,
      initialDeposit,
      guarantors,
    });

    // Save loan request to the database
    const savedLoanRequest = await loanRequest.save();

    // Generate a QR code for the loan request slip
    const qrCodeFilePath = path.join(process.cwd(), 'uploads', `qr_${uuidv4()}.png`);
    await qrCodeGenerator.generateQR(savedLoanRequest._id.toString(), qrCodeFilePath);

    // Attach the QR code file path to the loan request document
    savedLoanRequest.slip = qrCodeFilePath;

    // Save the updated loan request document with the QR code path
    await savedLoanRequest.save();

    // Return a success response
    res.status(201).json({ message: 'Loan request created successfully', loanRequest: savedLoanRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating loan request', error: error.message });
  }
};

// Get loan details for a specific user
export const getLoanDetails = async (req, res) => {
  try {
    // Fetch loan details for the specific user
    const loanRequest = await LoanRequest.findOne({ userId: req.params.userId }).populate('userId');
    if (!loanRequest) {
      return res.status(404).json({ message: 'Loan request not found' });
    }
    res.status(200).json(loanRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching loan details', error: error.message });
  }
};

// Update loan request status (for admins)
export const updateLoanStatus = async (req, res) => {
  try {
    const { loanId, status } = req.body;

    // Validate status
    const validStatuses = ['approved', 'rejected', 'pending'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Update the loan status
    const loanRequest = await LoanRequest.findByIdAndUpdate(
      loanId,
      { status },
      { new: true }
    );

    if (!loanRequest) {
      return res.status(404).json({ message: 'Loan request not found' });
    }

    // Return success response with updated loan request
    res.status(200).json({ message: 'Loan status updated successfully', loanRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating loan status', error: error.message });
  }
};
