// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");

/**
 * Middleware to authenticate user via JWT and attach user info to req.user
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    // Debug logging
    console.log("🔍 Auth Check:", {
      hasAuthHeader: !!authHeader,
      authHeader: authHeader ? authHeader.substring(0, 20) + "..." : "none",
      url: req.url,
      method: req.method
    });

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No valid authorization header");
      return res.status(401).json({ message: "Unauthorized - No valid token provided" });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      console.log("❌ No token found in authorization header");
      return res.status(401).json({ message: "Unauthorized - No token found" });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ JWT verified successfully:", { userId: decoded.id, role: decoded.role });
    } catch (jwtError) {
      console.error("❌ JWT verification failed:", jwtError.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    // Use Mongoose to find user by _id
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("❌ User not found in database:", decoded.id);
      return res.status(401).json({ message: "User not found" });
    }

    // Attach full user info for downstream role checks
    req.user = {
      id: user._id.toString(), // Ensure it's a string for consistent comparison
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log("✅ User authenticated:", {
      userId: req.user.id,
      userName: req.user.name,
      userRole: req.user.role
    });

    next();
  } catch (err) {
    console.error("❌ Auth middleware error:", err);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;