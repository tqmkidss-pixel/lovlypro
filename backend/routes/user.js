const express = require("express");
const router = express.Router();

// PING
router.get("/__ping__", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "PING OK DESDE USER ROUTES",
  });
});

// FIRESTORE TEST
router.get("/firestore-test", async (req, res) => {
  try {
    const db = req.app.locals.db;
    if (!db) {
      return res.status(500).json({ ok: false, error: "db_no_inicializada" });
    }

    const snap = await db.collection("users").limit(50).get();

    res.json({
      ok: true,
      message: "Firestore conectado correctamente",
      usersCount: snap.size,
      projectId: "lovly-pro",
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// USER SYNC
router.post("/sync", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const admin = req.app.locals.admin;

    if (!db) return res.status(500).json({ ok: false, error: "db_no_inicializada" });
    if (!admin) return res.status(500).json({ ok: false, error: "admin_no_inicializado" });

    const { uid, email, name } = req.body || {};

    if (!uid) return res.status(400).json({ ok: false, error: "uid requerido" });
    if (!email) return res.status(400).json({ ok: false, error: "email requerido" });

    const ref = db.collection("users").doc(uid);
    const snap = await ref.get();
    const now = admin.firestore.FieldValue.serverTimestamp();

    if (!snap.exists) {
      await ref.set({
        uid,
        email,
        name: name || "",
        planActive: "FREE",
        tokensRemaining: 3,
        createdAt: now,
        updatedAt: now,
      });

      const saved = await ref.get();
      return res.json({ ok: true, created: true, user: saved.data() });
    }

    await ref.set(
      {
        email,
        name: name || "",
        updatedAt: now,
      },
      { merge: true }
    );

    const saved = await ref.get();
    return res.json({ ok: true, created: false, user: saved.data() });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;