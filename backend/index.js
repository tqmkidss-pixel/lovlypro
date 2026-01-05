const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * ============================
 * Firebase Admin init
 * ============================
 */
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
  console.error("❌ FIREBASE_SERVICE_ACCOUNT_PATH no está definido en .env");
  process.exit(1);
}

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Service account no encontrado en:", serviceAccountPath);
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

console.log("✅ Firebase Admin inicializado correctamente");

/**
 * ============================
 * Health check
 * ============================
 */
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "lovlypro-backend", ready: true });
});

/**
 * ============================
 * User routes
 * ============================
 */
app.post("/api/user/sync", async (req, res) => {
  try {
    const { uid, email, name } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ ok: false, error: "missing_fields" });
    }

    const ref = db.collection("users").doc(uid);
    const snap = await ref.get();

    if (!snap.exists) {
      await ref.set({
        email,
        nombre: name || "",
        plan: "free",
        tokens: 3,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      await ref.update({
        email,
        nombre: name || "",
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    const finalSnap = await ref.get();

    res.json({
      ok: true,
      uid,
      ...finalSnap.data(),
    });
  } catch (err) {
    console.error("❌ /api/user/sync error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * ============================
 * Server
 * ============================
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://0.0.0.0:${PORT}`);
});