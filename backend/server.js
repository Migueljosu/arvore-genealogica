require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models"); // Importa os modelos do Sequelize
const usuarioRoutes = require("./routes/usuarioRoutes");
const pessoaRoutes = require("./routes/pessoaRoutes");
const casamentoRoutes = require("./routes/casamentoRoutes");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
// Servir arquivos estáticos da pasta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Rotas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/pessoas", pessoaRoutes);
app.use("/api/casamentos", casamentoRoutes);

// Sincronizar banco de dados e iniciar o servidor
const PORT = process.env.PORT || 3000;
db.sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado!");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error("Erro ao sincronizar DB:", err));
