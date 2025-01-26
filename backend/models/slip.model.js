import mongoose from 'mongoose';
const slipSchema = new mongoose.Schema({
    loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    token: { type: String, required: true, unique: true },
    qrCodeUrl: { type: String }, // URL or base64-encoded QR code
}, { timestamps: true });

export const Slip = mongoose.model('Slip', slipSchema);