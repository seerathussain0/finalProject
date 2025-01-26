import mongoose from 'mongoose';

const loanRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  loanAmount: { type: Number, required: true },
  loanCategory: { type: String, required: true },
  loanSubcategory: { type: String, required: true },
  loanPeriod: { type: String, required: true }, // Change this if you're storing the period as a string (e.g., "12 months")
  initialDeposit: { type: Number, required: true },
  guarantors: [{
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    cnic: { type: String, required: true },
  }],
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

export const Loan = mongoose.model('LoanRequest', loanRequestSchema);


