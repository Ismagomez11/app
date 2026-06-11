require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Garage = require("./models/Garage");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado 🚀"))
  .catch((err) => console.log(err));

/* ---------------- ROOT ---------------- */
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

/* ---------------- CREATE GARAGE ---------------- */
app.post("/garages", async (req, res) => {
  try {
    const {
      user_id,
      title,
      address,
      city,
      pricePerDay,
      spaces,
      availableFrom,
      availableTo,
      vehicleType,
      parkingType,
      description,
    } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "Usuario no identificado",
      });
    }

    const garage = new Garage({
      user_id,
      title,
      address,
      city,
      pricePerDay,
      spaces,
      availableFrom,
      availableTo,
      vehicleType,
      parkingType,
      description,
    });

    await garage.save();

    return res.status(201).json({
      message: "Garage creado correctamente 🚀",
      garage,
    });
  } catch (err) {
    console.error("ERROR:", err);

    return res.status(500).json({
      message: "Error creando garage",
      error: err.message,
    });
  }
});

/* ---------------- SERVER ---------------- */
app.listen(process.env.PORT, () => {
  console.log(`Servidor backend en puerto ${process.env.PORT}`);
});