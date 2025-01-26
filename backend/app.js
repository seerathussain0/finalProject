import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Import route modules
import guarantorRoutes from "./routes/guarantor.routes.js";
import userRoutes from "./routes/user.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import slipRoutes from "./routes/slip.routes.js";
import loanRoutes from './routes/loan.routes.js';
import dbConnect from "./config/dbConnect.js"
import path from "path";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(cors({
    origin: "https://final-project-9qfj.vercel.app", // Corrected origin (no trailing slash)
    credentials: true, // Allow credentials (cookies, etc.)
}));

// Define routes with unique paths
app.use('/api/loan', loanRoutes);
app.use('/api/user', userRoutes);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Express server!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    dbConnect()
});
