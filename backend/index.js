import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { pool } from "./db.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// -------------------- AUTH --------------------
async function auth(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header) return res.status(401).json({ message: "No token" });

    const token = header.split(" ")[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = data.user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// -------------------- CREATE GARAGE --------------------
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
    description,
  } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO garages (
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
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
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
        description,
      ]
    );

    res.status(201).json({
      message: "Garaje publicado correctamente",
      garage: result.rows[0],
    });
  } catch (err) {
    console.error("ERROR CREATE GARAGE:", err);
    res.status(500).json({ message: "Error publicando garaje" });
  }
});

// -------------------- MY GARAGES (🔥 FALTABA ESTO) --------------------
app.get("/my-garages", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM garages
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    return res.json({
      garages: result.rows,
    });
  } catch (err) {
    console.error("ERROR MY GARAGES:", err);

    return res.status(500).json({
      message: "Error obteniendo garajes",
    });
  }
});

// -------------------- SERVER --------------------
app.listen(3000, () => {
  console.log("Servidor en puerto 3000 🚀");
});