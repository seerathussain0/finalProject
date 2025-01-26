import { Loan } from "../models/loan.model.js";
import QRCode from "qrcode"

export const generateSlip = async (req, res) => {
    try {
        const { token } = req.params;

        // Find the loan associated with the provided token
        const loan = await Loan.findOne({ "token": token });
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        // Generate QR code from the loan token
        QRCode.toDataURL(token, (err, qrCodeUrl) => {
            if (err) {
                return res.status(500).json({ message: "Failed to generate QR code", error: err.message });
            }

            // Return loan details along with the generated QR code
            res.status(200).json({
                message: "Slip generated successfully",
                loan: {
                    token: loan.token,
                    amount: loan.amount,
                    loanPeriod: loan.loanPeriod,
                    category: loan.category,
                    subcategory: loan.subcategory,
                    status: loan.status,
                    qrCode: qrCodeUrl, // QR Code image in base64 format
                },
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export default generateSlip