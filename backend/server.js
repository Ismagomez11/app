require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { auth } = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 DEBUG (opcional pero útil)
console.log("JWT_SECRET:", process.env.JWT_SECRET);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado 🚀"))
  .catch((err) => console.log(err));

/* ---------------- ROOT ---------------- */
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

/* ---------------- LOGIN ---------------- */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  // 🔥 MOCK USER (luego lo conectas a MongoDB)
  const user = {
    id: 1,
    email,
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.json({
    message: "Login OK 🚀",
    token,
    user,
  });
});

/* ---------------- ME ---------------- */
app.get("/me", auth, (req, res) => {
  return res.json({
    user: req.user,
  });
});

/* ---------------- SERVER ---------------- */
app.listen(process.env.PORT, () => {
  console.log(`Servidor backend en puerto ${process.env.PORT}`);
});