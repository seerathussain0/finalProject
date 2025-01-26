import mongoose from "mongoose";

const loanApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    loanPeriod: {
        type: Number,
        required: true,
    },
    applicationStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
});

const LoanApplication = mongoose.model("LoanApplication", loanApplicationSchema);

export default LoanApplication;
