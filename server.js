require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas de autenticación
app.use(cors())
app.use('/api/', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
