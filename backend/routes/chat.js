const express = require("express");
const router = express.Router();

// Placeholder: luego proxy a Gemini vía Secret Manager
router.get("/health", (req, res) => {
  res.json({ status: "ok", route: "chat" });
});

module.exports = router;
