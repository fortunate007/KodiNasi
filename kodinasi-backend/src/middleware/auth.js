// src/middleware/auth.js
const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

function requireRole(role) {
  return (req, res, next) =>
    req.user?.role === role
      ? next()
      : res.status(403).json({ error: "Forbidden" });
}

module.exports = { requireAuth, requireRole };