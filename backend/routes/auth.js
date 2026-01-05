const express = require("express");
const router = express.Router();

// Placeholder: luego irá verificación Firebase Auth, creación user doc, etc.
router.get("/health", (req, res) => {
  res.json({ status: "ok", route: "auth" });
});

module.exports = router;
