const express = require("express");
const router = express.Router();
const casamentoController = require("../controllers/casamentoController");
const authMiddleware = require("../middleware/authMiddleware");

// Criar um casamento
router.post("/", authMiddleware.verifyToken, casamentoController.createCasamento);

// Listar todos os casamentos
router.get("/", casamentoController.getAllCasamentos);

// Obter um casamento por ID
router.get("/:id", casamentoController.getCasamentoById);

// Atualizar um casamento (adicionar/remover participantes)
router.put("/:id", authMiddleware.verifyToken, casamentoController.updateCasamento);

// Deletar um casamento
router.delete("/:id", authMiddleware.verifyToken, casamentoController.deleteCasamento);

module.exports = router;
