import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  // Access the token from cookies or Authorization header
  const token = req.cookies.authToken || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // Verify the token and extract user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateUser;
