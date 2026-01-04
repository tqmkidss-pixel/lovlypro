const express = require("express");
const cors = require("cors");

const app = express();

// Cloud Run usa la variable de entorno PORT
const PORT = process.env.PORT || 8080;

// Middlewares base
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Endpoint de salud (obligatorio para Cloud Run)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});