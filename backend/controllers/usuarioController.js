const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario, Pessoa } = require("../models"); // Importa os modelos

exports.register = async (req, res) => {
  try {
    const { email, senha, id_pessoa } = req.body;

    // Verifica se a pessoa já tem uma conta
    const pessoa = await Pessoa.findByPk(id_pessoa);
    if (!pessoa) return res.status(404).json({ message: "Pessoa não encontrada" });

    // Verifica se o email já está cadastrado
    const userExists = await Usuario.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: "E-mail já cadastrado" });

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    // Criar usuário
    const usuario = await Usuario.create({ email, senha: hashedPassword, id_pessoa });

    res.status(201).json({ message: "Usuário cadastrado com sucesso", usuario });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(400).json({ message: "E-mail ou senha incorretos" });

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(400).json({ message: "E-mail ou senha incorretos" });

    // Gerar token JWT
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id, { include: Pessoa });
    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar perfil", error: error.message });
  }
};
