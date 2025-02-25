const express = require("express");
const router = express.Router();
const pessoaController = require("../controllers/pessoaController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig"); // Importar Multer

// Criar uma nova pessoa com upload de foto
router.post("/", authMiddleware.verifyToken, upload.single("foto_perfil"), pessoaController.createPessoa);

// Listar todas as pessoas
router.get("/", pessoaController.getAllPessoas);

// Obter uma pessoa por ID
router.get("/:id", pessoaController.getPessoaById);

// Atualizar uma pessoa
router.put("/:id", authMiddleware.verifyToken, upload.single("foto_perfil"), pessoaController.updatePessoa);

// Deletar uma pessoa
router.delete("/:id", authMiddleware.verifyToken, pessoaController.deletePessoa);

module.exports = router;
