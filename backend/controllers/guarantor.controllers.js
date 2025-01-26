import { Loan } from "../models/loan.model.js";

export const addGuarantor = async (req, res) => {
  try {
    const { loanId, name, cnic, relation } = req.body;

    // Basic validation
    if (!loanId || !name || !cnic) {
      return res.status(400).json({ message: "Loan ID, name, and CNIC are required" });
    }

    // Find the loan by ID
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Add the new guarantor to the loan
    const newGuarantor = { name, cnic, relation };
    loan.guarantors.push(newGuarantor);

    // Save the updated loan
    await loan.save();

    res.status(200).json({
      message: "Guarantor added successfully",
      loan: loan,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

