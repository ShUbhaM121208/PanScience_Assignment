// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;
