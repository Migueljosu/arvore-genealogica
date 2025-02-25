const { Casamento, Casamento_Pessoa, Pessoa } = require("../models");

exports.createCasamento = async (req, res) => {
  try {
    const { data_casamento, participantes } = req.body; // participantes = [{ id_pessoa, tipo }]

    if (!participantes || participantes.length < 2) {
      return res.status(400).json({ message: "Um casamento deve ter pelo menos duas pessoas." });
    }

    // Criar o casamento
    const novoCasamento = await Casamento.create({ data_casamento });

    // Associar os participantes (maridos/esposas)
    const casamentoPessoas = participantes.map((p) => ({
      id_casamento: novoCasamento.id,
      id_pessoa: p.id_pessoa,
      tipo: p.tipo,
    }));

    await Casamento_Pessoa.bulkCreate(casamentoPessoas);

    res.status(201).json({ message: "Casamento criado com sucesso!", casamento: novoCasamento });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar casamento", error: error.message });
  }
};

exports.getAllCasamentos = async (req, res) => {
  try {
    const casamentos = await Casamento.findAll({
      include: {
        model: Casamento_Pessoa,
        as: "participantes",
        include: { model: Pessoa, as: "pessoa" },
      },
    });

    res.status(200).json(casamentos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar casamentos", error: error.message });
  }
};

exports.getCasamentoById = async (req, res) => {
  try {
    const { id } = req.params;
    const casamento = await Casamento.findByPk(id, {
      include: {
        model: Casamento_Pessoa,
        as: "participantes",
        include: { model: Pessoa, as: "pessoa" },
      },
    });

    if (!casamento) return res.status(404).json({ message: "Casamento não encontrado" });

    res.status(200).json(casamento);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar casamento", error: error.message });
  }
};

exports.updateCasamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { participantes } = req.body; // Lista de [{ id_pessoa, tipo }]

    const casamento = await Casamento.findByPk(id);
    if (!casamento) return res.status(404).json({ message: "Casamento não encontrado" });

    // Remover todos os participantes anteriores
    await Casamento_Pessoa.destroy({ where: { id_casamento: id } });

    // Adicionar novos participantes
    const casamentoPessoas = participantes.map((p) => ({
      id_casamento: id,
      id_pessoa: p.id_pessoa,
      tipo: p.tipo,
    }));

    await Casamento_Pessoa.bulkCreate(casamentoPessoas);

    res.status(200).json({ message: "Casamento atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar casamento", error: error.message });
  }
};

exports.deleteCasamento = async (req, res) => {
  try {
    const { id } = req.params;

    const casamento = await Casamento.findByPk(id);
    if (!casamento) return res.status(404).json({ message: "Casamento não encontrado" });

    // Remover relações de Casamento_Pessoa antes de deletar o casamento
    await Casamento_Pessoa.destroy({ where: { id_casamento: id } });

    await casamento.destroy();
    res.status(200).json({ message: "Casamento deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar casamento", error: error.message });
  }
};
