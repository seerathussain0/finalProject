import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

import nodemailer from 'nodemailer';
import crypto from 'crypto';

const saltRounds = 10;

// Generate a random password
const generatePassword = () => {
    return crypto.randomBytes(8).toString('hex'); // Generates a 16-character password
};

// Send email with the password
const sendEmail = async (email, name, generatedPassword) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mvk40kld@gmail.com', // Your email address
            pass: 'oliy gnih aurx fait', // Your email password or app password
        },
    });

    const mailOptions = {
        from: 'mvk40kld@gmail.com',
        to: email,
        subject: 'Your Registration Details',
        text: `Hello ${name},\n\nYour account has been successfully registered. Here is your password: ${generatedPassword}\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);
};

export const registerUser = async (req, res) => {
    try {
        const { cnic, email, name } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Generate a new password
        const generatedPassword = generatePassword();

        // Hash the generated password
        const hashedPassword = await bcrypt.hash(generatedPassword, saltRounds);

        // Create a new user
        const newUser = new User({
            cnic,
            email,
            name,
            password: hashedPassword,
        });

        await newUser.save();

        // Send the generated password to the user's email
        await sendEmail(email, name, generatedPassword);

        res.status(201).json({ message: "User registered successfully, password sent to email." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "defaultSecret", // Replace with an environment variable
            { expiresIn: "7d" }
        );

        res.cookie("authToken", token, {
            httpOnly: true,      // Makes the cookie accessible only via HTTP(S), not JavaScript
            sameSite: "None",    // Allow the cookie to be sent with cross-origin requests
            secure: process.env.NODE_ENV === 'production', // Only set the cookie over HTTPS in production
            maxAge: 7 * 24 * 60 * 60 * 1000, // Optional: Set expiration time (7 days)
        }).status(200).json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

