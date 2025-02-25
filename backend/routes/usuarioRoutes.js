const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middleware/authMiddleware");

// Rotas públicas
router.post("/register", usuarioController.register);
router.post("/login", usuarioController.login);

// Rota protegida (somente usuários autenticados)
router.get("/perfil", authMiddleware.verifyToken, usuarioController.getProfile);

module.exports = router;
