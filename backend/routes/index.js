const express = require("express");

const authRoutes = require("./auth");
const chatRoutes = require("./chat");
const payRoutes = require("./pay");
const webhookRoutes = require("./webhook");
const userRoutes = require("./user");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/pay", payRoutes);
router.use("/webhook", webhookRoutes);
router.use("/user", userRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "ok", router: "api" });
});

module.exports = router;
