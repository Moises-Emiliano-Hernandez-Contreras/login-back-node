const express = require('express');
const { register, login, getProtectedData,saludo } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/home', authenticateToken, getProtectedData);
router.get("/saludo", saludo)

module.exports = router;
