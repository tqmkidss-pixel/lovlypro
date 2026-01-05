const express = require("express");
const router = express.Router();

// Placeholder: luego Stripe Checkout session
router.get("/health", (req, res) => {
  res.json({ status: "ok", route: "pay" });
});

module.exports = router;
