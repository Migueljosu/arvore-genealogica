const { Pessoa } = require("../models");

exports.createPessoa = async (req, res) => {
  try {
    const { nome, genero, data_nascimento, id_pai, id_mae } = req.body;
    const foto_perfil = req.file ? req.file.filename : null; // Nome do arquivo salvo

    const novaPessoa = await Pessoa.create({
      nome,
      genero,
      data_nascimento,
      id_pai,
      id_mae,
      foto_perfil,
    });

    res
      .status(201)
      .json({ message: "Pessoa cadastrada com sucesso!", pessoa: novaPessoa });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar pessoa", error: error.message });
  }
};
exports.getAllPessoas = async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.status(200).json(pessoas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar pessoas", error: error.message });
  }
};

exports.getPessoaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pessoa = await Pessoa.findByPk(id);

    if (!pessoa)
      return res.status(404).json({ message: "Pessoa não encontrada" });

    res.status(200).json(pessoa);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar pessoa", error: error.message });
  }
};

exports.updatePessoa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, genero, data_nascimento, id_pai, id_mae } = req.body;
    const foto_perfil = req.file ? req.file.filename : null; // Nome do arquivo salvo

    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa)
      return res.status(404).json({ message: "Pessoa não encontrada" });

    await pessoa.update({
      nome,
      genero,
      data_nascimento,
      id_pai,
      id_mae,
      foto_perfil,
    });

    res.status(200).json({ message: "Pessoa atualizada com sucesso!", pessoa });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar pessoa", error: error.message });
  }
};

exports.deletePessoa = async (req, res) => {
  try {
    const { id } = req.params;

    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa)
      return res.status(404).json({ message: "Pessoa não encontrada" });

    await pessoa.destroy();
    res.status(200).json({ message: "Pessoa deletada com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar pessoa", error: error.message });
  }
};
