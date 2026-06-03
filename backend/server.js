require('dotenv').config();
console.log(process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado 🚀');
  })
  .catch((error) => {
    console.log(error);
  });

app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando 🚀'
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor backend en puerto ${process.env.PORT}`);
});