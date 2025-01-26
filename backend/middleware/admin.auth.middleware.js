import { User } from "../models/user.model";

const adminAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Access denied, token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.role !== 'admin') {  // Add role check
            return res.status(403).json({ message: "Access denied, not an admin" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default adminAuthMiddleware;
