import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "./db.js";

dotenv.config();

const app = express();

// --------------------
// MIDDLEWARES
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// START LOG
// --------------------
console.log("🚀 Servidor iniciando...");
console.log("DATABASE_URL cargada:", !!process.env.DATABASE_URL);

// --------------------
// AUTH MIDDLEWARE
// --------------------
function auth(req, res, next) {

  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "No token"
    });
  }

  const token = header.split(" ")[1];

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      message: "Token inválido"
    });
  }
}

// --------------------
// RUTA BASE
// --------------------
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// --------------------
// TEST DB
// --------------------
app.get("/test-db", async (req, res) => {

  try {

    const result = await pool.query("SELECT NOW()");

    res.json(result.rows);

  } catch (err) {

    console.error("❌ ERROR BD:", err);

    res.status(500).json({
      message: err.message,
      code: err.code
    });
  }
});

// --------------------
// REGISTER
// --------------------
app.post("/register", async (req, res) => {

  const {
    name,
    lastname,
    nif,
    address,
    city,
    postalCode,
    phone,
    email,
    password
  } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users
      (
        name,
        lastname,
        nif,
        address,
        city,
        postal_code,
        phone,
        email,
        password
      )
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING
      id,
      name,
      lastname,
      email
      `,
      [
        name,
        lastname,
        nif,
        address,
        city,
        postalCode,
        phone,
        email,
        hashedPassword
      ]
    );

    res.json({
      message: "Usuario creado 🚀",
      user: result.rows[0]
    });

  } catch (err) {

    console.error("❌ ERROR REGISTER:", err);

    if (err.code === "23505") {

      return res.status(400).json({
        message: "El usuario ya existe"
      });
    }

    res.status(500).json({
      message: "Error servidor"
    });
  }
});

// --------------------
// LOGIN
// --------------------
app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {

      return res.status(400).json({
        message: "Usuario no existe"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {

      return res.status(400).json({
        message: "Password incorrecta"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login OK 🚀",
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (err) {

    console.error("❌ ERROR LOGIN:", err);

    res.status(500).json({
      message: "Error servidor"
    });
  }
});

// --------------------
// PROFILE
// --------------------
app.get("/profile", auth, async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        lastname,
        email,
        nif,
        address,
        city,
        postal_code,
        phone
      FROM users
      WHERE id = $1
      `,
      [req.user.id]
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error obteniendo perfil"
    });
  }
});

// --------------------
// GET MY GARAGES
// --------------------
app.get("/my-garages", auth, async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT
        id,
        title,
        address,
        city,
        price_per_day,
        spaces,
        available_from,
        available_to,
        vehicle_type,
        parking_type,
        description,
        created_at
      FROM garages
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    res.json({
      garages: result.rows
    });

  } catch (err) {

    console.error("❌ ERROR GET MY GARAGES:", err);

    res.status(500).json({
      message: "Error obteniendo garajes"
    });
  }
});

// --------------------
// CREATE GARAGE
// --------------------
app.post("/garages", auth, async (req, res) => {

  const {
    title,
    address,
    city,
    pricePerDay,
    spaces,
    availableFrom,
    availableTo,
    vehicleType,
    parkingType,
    description
  } = req.body;

  try {

    const result = await pool.query(
      `
      INSERT INTO garages
      (
        user_id,
        title,
        address,
        city,
        price_per_day,
        spaces,
        available_from,
        available_to,
        vehicle_type,
        parking_type,
        description
      )
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
      `,
      [
        req.user.id,
        title,
        address,
        city,
        pricePerDay,
        spaces,
        availableFrom,
        availableTo,
        vehicleType,
        parkingType,
        description
      ]
    );

    res.status(201).json({
      message: "Garaje publicado correctamente",
      garage: result.rows[0]
    });

  } catch (err) {

    console.error("❌ ERROR CREATE GARAGE:", err);

    res.status(500).json({
      message: "Error publicando garaje"
    });
  }
});

// --------------------
// SERVER
// --------------------
app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});