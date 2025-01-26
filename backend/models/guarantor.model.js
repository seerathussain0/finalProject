import mongoose from "mongoose"

const guarantorSchema = new mongoose.Schema({
    loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    name: { type: String, required: true },
    cnic: { type: String, required: true },
    relation: { type: String }
}, { timestamps: true });

export const Guarantor = mongoose.model('Guarantor', guarantorSchema);