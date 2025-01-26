import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    tokenNumber: {
        type: String,
        required: true,
        unique: true,
    },
    qrCode: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

export const Appointment = mongoose.model("Appointment", appointmentSchema);